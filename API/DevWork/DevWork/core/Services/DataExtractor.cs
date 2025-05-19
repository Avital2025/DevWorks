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

    public async Task<ExtractedDataEntity> ExtractData(byte[] fileData, int employerId, AIResponse aiResponse, string projectName)
    {
        if (aiResponse == null)
        {
            throw new Exception("AIResponse חסר, לא ניתן להמשיך.");
        }

        var fileEntity = await _context.filesList
      .Where(f => f.EmployerID == employerId)
      .OrderByDescending(f => f.CreatedAt) 
      .FirstOrDefaultAsync();

        if (fileEntity == null)
        {
            throw new Exception("לא נמצא קובץ תואם ב-DB.");
        }

        string employerIdString = employerId.ToString();
        string projectNameWithoutEmployerId = projectName.Substring(employerIdString.Length);

        var extractedData = new ExtractedDataEntity
        {
            EmployerID = employerId,
            EmployerEmail = fileEntity.EmployerEmail,
            S3Key = fileEntity.S3Key,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            IsActive = true,
            Title = projectNameWithoutEmployerId,
            DisplayName = projectNameWithoutEmployerId,
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
