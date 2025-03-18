using DevWork.Core.Entities;
using DevWork.Service.Iservice;
using DevWork.Service.IService;
using System.Text;


public class DataExtractor : IDataExtractor
{
    private readonly IAIService _aiService;
    private readonly DataExtractor _context;

    public DataExtractor(IAIService aiService, DataExtractor context)
    {
        _aiService = aiService;
        _context = context;
    }

    public async Task<ExtractedDataEntity> ExtractData(byte[] fileData, int employerId)
    {
        // שלח את הקובץ ל-AI ושמור את התשובה
        string fileText = Encoding.UTF8.GetString(fileData);
        var aiResponse = await _aiService.SaveProjectDescriptionToDB(fileText, employerId);


        if (aiResponse == null)
        {
            throw new Exception("לא הצלחנו לקבל תשובת AI.");
        }

        // עכשיו ניצור את ה-ExtractedDataEntity
        var extractedData = new ExtractedDataEntity
        {
            EmployerID = employerId,
            AIResponseId = aiResponse.Id, // מקשר ל-AIResponse ששמרנו
            S3Key = aiResponse.FileUrl, // שדה סביר במידה ו-AI מחזיר URL לקובץ
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        };

        // שמור את הנתונים ב-DB
        _context.extractedDataList.Add(extractedData);
        await _context.SaveChangesAsync();

        return extractedData;
    }


}
