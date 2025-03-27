using Amazon.S3.Model;
using Amazon.S3;
using AutoMapper;
using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.Core.Entities;
using DevWork.Data;
using DevWork.Service.Iservice;
using DevWork.Service.IService;
using Microsoft.EntityFrameworkCore;
using System.Text;
using static DevWork.Core.Dto.FilesDto;

public class FilesService : IFilesService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IS3Service _s3Service;
    private readonly IDataExtractor _dataExtractor;
    private readonly IAIService _aiService;

    public FilesService(IAIService aIService ,DataContext context, IMapper mapper, IS3Service s3Service, IDataExtractor dataExtractor)
    {
        _context = context;
        _mapper = mapper;
        _s3Service = s3Service;
        _dataExtractor = dataExtractor;
        _aiService= aIService;
    }
    //public async Task<ExtractedDataEntity> ProcessFile(string fileUrl, int employerId )
    //{
    //    var fileData = await _s3Service.DownloadFileAsync(fileUrl);
    //    var extractedData = await _dataExtractor.ExtractData(fileData, employerId);


    //    var fileText = Encoding.UTF8.GetString(fileData);

    //    // שימו לב, ה-AI מייצר תשובה על בסיס הנתונים שהפקעתם
    //    var aiResponse = await _aiService.SaveProjectDescriptionToDB(fileText);



    //    // שמירת תשובת ה-AI
    //    _context.AIResponses.Add(aiResponse);
    //    await _context.SaveChangesAsync();

    //    // שמירת ExtractedData עם AIResponseId
    //    extractedData.AIResponseId = aiResponse.Id;
    //    _context.extractedDataList.Add(extractedData);
    //    await _context.SaveChangesAsync();

    //    return extractedData;
    //}

    public async Task<ExtractedDataEntity> ProcessFile(string fileUrl, int employerId)
    {
        var fileData = await _s3Service.DownloadFileAsync(fileUrl);
        var fileText = Encoding.UTF8.GetString(fileData);
        Console.WriteLine("????????????????????????????");
        // קריאת ה-AI פעם אחת בלבד
        var aiResponse = await _aiService.SaveProjectDescriptionToDB(fileText);
        _context.AIResponses.Add(aiResponse);
        await _context.SaveChangesAsync();

        // שולח את התשובה לפונקציה ExtractData בלי לקרוא שוב ל-AI
        var extractedData = await _dataExtractor.ExtractData(fileData, employerId, aiResponse);

        _context.extractedDataList.Add(extractedData);
        await _context.SaveChangesAsync();

        return extractedData;
    }


    public async Task<IEnumerable<FilesDto>> GetUserFilesAsync(string userId)
    {
        if (!int.TryParse(userId, out int employerId))
        {
            return new List<FilesDto>(); // במקרה שה-ID לא תקין
        }

        return await _context.filesListDto
            .Where(f => f.EmployerId == employerId)
            .Select(f => new FilesDto
            {
                Id = f.Id,
                FileName = f.FileName,
                FileUrl = f.FileUrl,
                FileType = f.FileType,
                Size = f.Size,
                CreatedAt = f.CreatedAt,
                EmployerId = f.EmployerId  // כאן אנחנו מחזירים את ה-EmployerId
            })
            .ToListAsync();
    }



    // פונקציה להורדת הקובץ!!

    //public async Task<string?> GetDownloadUrl(int fileId)
    //{
    //    var file = await _context.filesList.FindAsync(fileId);
    //    if (file is null) return null;

    //    var request = new GetPreSignedUrlRequest
    //    {
    //        BucketName = "devwork", // שם הבקט שלך
    //        Key = file.StoredFileName, // שם הקובץ כפי שהוא נשמר ב-S3
    //        Verb = HttpVerb.GET,
    //        Expires = DateTime.UtcNow.AddMinutes(15) // תוקף הלינק
    //    };

    //    return await _s3Service.GeneratePreSignedUrlAsync(fileName, HttpVerb.PUT);
    //}



    public async Task<IEnumerable<FilesDto>> GetAllFiles()
    {
        var files = await _context.filesList.ToListAsync();
        return _mapper.Map<IEnumerable<FilesDto>>(files);
    }

    public async Task<FilesDto?> GetFileById(int fileId)
    {
        var file = await _context.filesList.FindAsync(fileId);
        return file is not null ? _mapper.Map<FilesDto>(file) : null;
    }

    //public async Task<FilesDto> AddFile(FilesPostModel filePostModel)
    //{
    //    var fileEntity = _mapper.Map<FilesEntity>(filePostModel);
    //    _context.filesList.Add(fileEntity);
    //    await _context.SaveChangesAsync();
    //    return _mapper.Map<FilesDto>(fileEntity);
    //}

    public async Task<FilesDto?> UpdateFile(FilesPostModel filePostModel)
    {
        var existingFile = await _context.filesList.FindAsync(filePostModel.Id);
        if (existingFile is null) return null;

        _mapper.Map(filePostModel, existingFile);
        await _context.SaveChangesAsync();

        return _mapper.Map<FilesDto>(existingFile);
    }

    public async Task<bool> DeleteFile(int fileId)
    {
        var file = await _context.filesList.FindAsync(fileId);
        if (file is null) return false;

        _context.filesList.Remove(file);
        await _context.SaveChangesAsync();
        return true;
    }
}
