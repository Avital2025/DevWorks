using DevWork.Core.Entities;
using DevWork.Data;
using DevWork.Service.Iservice;
using DevWork.Service.IService;
using System.Text;
using Microsoft.EntityFrameworkCore;

public class DataExtractor : IDataExtractor
{
    private readonly IAIService _aiService;
    private readonly DataContext _context;

    public DataExtractor(IAIService aiService, DataContext context)
    {
        _aiService = aiService;
        _context = context;
    }

    //public async Task<ExtractedDataEntity> ExtractData(byte[] fileData, int employerId)
    //{
    //    // שלח את הקובץ ל-AI ושמור את התשובה
    //    string fileText = Encoding.UTF8.GetString(fileData);
    //    var aiResponse = await _aiService.SaveProjectDescriptionToDB(fileText);


    //    if (aiResponse == null)
    //    {
    //        throw new Exception("לא הצלחנו לקבל תשובת AI.");
    //    }
    //    // 🟢 שליפת ה-S3Key מתוך הטבלה של הקבצים לפי ה-EmployerId
    //    var fileEntity = await _context.filesList
    //        .Where(f => f.EmployerID == employerId)
    //        .OrderByDescending(f => f.CreatedAt) // לוקח את הקובץ האחרון שהועלה
    //        .FirstOrDefaultAsync();

    //    if (fileEntity == null)
    //    {
    //        throw new Exception("לא נמצא קובץ תואם ב-DB.");
    //    }

    //    // עכשיו ניצור את ה-ExtractedDataEntity
    //    var extractedData = new ExtractedDataEntity
    //    {
    //        EmployerID = employerId,
    //        AIResponseId = aiResponse.Id, // מקשר ל-AIResponse ששמרנו
    //        S3Key = fileEntity.S3Key,
    //        CreatedAt = DateTime.Now,
    //        UpdatedAt = DateTime.Now
    //    };

    //    // שמור את הנתונים ב-DB
    //    _context.extractedDataList.Add(extractedData);
    //    await _context.SaveChangesAsync();

    //    return extractedData;
    //}
    //public async Task<ExtractedDataEntity> ExtractData(byte[] fileData, int employerId, AIResponse aiResponse)
    //{
    //    if (aiResponse == null)
    //    {
    //        throw new Exception("AIResponse חסר, לא ניתן להמשיך.");
    //    }

    //    var fileEntity = await _context.filesList
    //        .Where(f => f.EmployerID == employerId)
    //        .OrderByDescending(f => f.CreatedAt)
    //        .FirstOrDefaultAsync();

    //    if (fileEntity == null)
    //    {
    //        throw new Exception("לא נמצא קובץ תואם ב-DB.");
    //    }

    //    var extractedData = new ExtractedDataEntity
    //    {
    //        EmployerID = employerId,
    //       // AIResponseId = aiResponse.Id,
    //        S3Key = fileEntity.S3Key,
    //        CreatedAt = DateTime.Now,
    //        UpdatedAt = DateTime.Now
    //    };

    //    return extractedData;
    //}

    public async Task<ExtractedDataEntity> ExtractData(byte[] fileData, int employerId, AIResponse aiResponse)
    {
        if (aiResponse == null)
        {
            throw new Exception("AIResponse חסר, לא ניתן להמשיך.");
        }

        var fileEntity = await _context.filesList
      .Where(f => f.EmployerID == employerId)
      .OrderByDescending(f => f.CreatedAt) // עדיין נשאר, כדי לקבל את הקובץ האחרון
      .FirstOrDefaultAsync();

        if (fileEntity == null)
        {
            throw new Exception("לא נמצא קובץ תואם ב-DB.");
        }

        var extractedData = new ExtractedDataEntity
        {
            EmployerID = employerId,
            S3Key = fileEntity.S3Key,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            IsActive = true,
            // העתקת ערכים של AIResponse ישירות
            Title = aiResponse.Title,
            Description = aiResponse.Description,
            Experience = aiResponse.Experience,
            WorkPlace = aiResponse.WorkPlace,
            Languages = aiResponse.Languages,
            RemoteWork = aiResponse.RemoteWork,
            EnglishLevel = aiResponse.EnglishLevel
        };

        return extractedData;
    }

}
