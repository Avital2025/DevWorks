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
using DocumentFormat.OpenXml.Packaging;
using UglyToad.PdfPig;

public class FilesService : IFilesService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IS3Service _s3Service;
    private readonly IDataExtractor _dataExtractor;
    private readonly IAIService _aiService;

    public FilesService(IAIService aIService, DataContext context, IMapper mapper, IS3Service s3Service, IDataExtractor dataExtractor)
    {
        _context = context;
        _mapper = mapper;
        _s3Service = s3Service;
        _dataExtractor = dataExtractor;
        _aiService = aIService;
    }




    public async Task<bool> CheckIfFileExistsAsync(string displayName, int employerId)
    {
        bool fileExists = await _context.filesList
            .AnyAsync(f => f.DisplayName == displayName && f.EmployerID == employerId);
        return fileExists;
    }

    public static string DetectFileType(byte[] fileBytes)
    {
        if (fileBytes == null || fileBytes.Length < 4)
            return "unknown";

        // PDF
        if (fileBytes.Take(4).SequenceEqual(new byte[] { 0x25, 0x50, 0x44, 0x46 })) // %PDF
            return "pdf";

        // DOCX
        try
        {
            using var ms = new MemoryStream(fileBytes);
            using var archive = new System.IO.Compression.ZipArchive(ms);
            if (archive.Entries.Any(e => e.FullName == "[Content_Types].xml"))
                return "docx";
        }
        catch
        {
            // Not a zip – ignore
        }

        // DOC (ישן)
        if (fileBytes.Take(4).SequenceEqual(new byte[] { 0xD0, 0xCF, 0x11, 0xE0 }))
            return "doc";

        return "unknown";
    }

    public async Task<ExtractedDataEntity> ProcessFile(string fileUrl, int employerId, string projectName)
    {
        var fileData = await _s3Service.DownloadFileAsync(fileUrl);
        var fileType = DetectFileType(fileData); 

        string fileText;

        switch (fileType)
        {
            case "docx":
                using (var stream = new MemoryStream(fileData))
                using (var doc = WordprocessingDocument.Open(stream, false))
                {
                    fileText = doc.MainDocumentPart.Document.Body.InnerText;
                }
                break;

            case "pdf":
                using (var stream = new MemoryStream(fileData))
                using (var pdf = PdfDocument.Open(stream))
                {
                    var sb = new StringBuilder();
                    foreach (var page in pdf.GetPages())
                    {
                        sb.Append(page.Text);
                    }
                    fileText = sb.ToString();
                }
                break;

            case "txt":
            default:
                fileText = Encoding.UTF8.GetString(fileData);
                break;
        }

        var aiResponse = await _aiService.SaveProjectDescriptionToDB(fileText);

        var employer = _context.usersList.FirstOrDefault(u => u.Id == employerId);
        string employerEmail = employer?.Email ?? "";
        string employerIdString = employerId.ToString();
        string projectNameWithoutEmployerId = projectName.Substring(employerIdString.Length);

        var fileEntity = new FilesEntity
        {
            FileName = projectNameWithoutEmployerId,
            DisplayName = projectNameWithoutEmployerId,
            FileType = "." + fileType,
            Size = fileData.Length,
            S3Key = fileUrl,
            EmployerID = employerId,
            EmployerEmail = employerEmail,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            IsDeleted = false,
        };

        _context.filesList.Add(fileEntity);
        await _context.SaveChangesAsync();

        var extractedData = await _dataExtractor.ExtractData(fileData, employerId, aiResponse, projectName);
        _context.extractedDataList.Add(extractedData);
        await _context.SaveChangesAsync();

        return extractedData;
    }


    public async Task<bool> DeleteFileAsync(int fileId)
    {
        var file = await _context.filesList.FindAsync(fileId);
        if (file == null) return false;

        file.IsDeleted = true;

        var employerId = file.EmployerID;
        var fileTitle = file.FileName;

        var extractedData = await _context.extractedDataList
            .Where(e => e.EmployerID == employerId && e.Title == fileTitle)
            .ToListAsync();

        foreach (var data in extractedData)
        {
            data.IsActive = false;
            data.UpdatedAt = DateTime.Now;
        }

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RenameFileAsync(int fileId, string newFileName)
    {
        var file = await _context.filesList.FindAsync(fileId);
        if (file == null) return false;

        var oldFileName = file.FileName;
        var employerId = file.EmployerID;

        file.DisplayName = newFileName;
        file.UpdatedAt = DateTime.Now; // עדכון תאריך שינוי

        var matchingData = await _context.extractedDataList
            .Where(x => x.EmployerID == employerId && x.Title == oldFileName)
            .ToListAsync();

        foreach (var data in matchingData)
        {
            data.DisplayName = newFileName;
            data.UpdatedAt = DateTime.Now;
        }

        await _context.SaveChangesAsync();
        return true;
    }


    public async Task<IEnumerable<FilesDto>> GetUserFilesAsync(string userId)
    {
        userId = userId?.Trim(); 
        if (!int.TryParse(userId, out int employerId))
        {
            return new List<FilesDto>();
        }

        return await _context.filesList
            .Where(f => f.EmployerID == employerId && !f.IsDeleted)
            .Select(f => new FilesDto
            {
                Id = f.Id,
                FileName = f.DisplayName,
                FileUrl = f.S3Key,
                FileType = f.FileType,
                Size = f.Size,
                CreatedAt = f.CreatedAt,
                EmployerId = f.EmployerID
            })
            .ToListAsync();


    }



    public async Task<FilesDto?> GetFileById(int fileId)
    {
        var file = await _context.filesList.FindAsync(fileId);
        return file is not null ? _mapper.Map<FilesDto>(file) : null;
    }


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
