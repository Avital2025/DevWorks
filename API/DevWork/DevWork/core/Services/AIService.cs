using DevWork.Core.Entities;
using DevWork.Data;
using DevWork.Service.Iservice;
using Microsoft.EntityFrameworkCore;

public class AIService : IAIService
{
    private readonly HttpClient _httpClient;
    private readonly DataContext _context;


    public AIService(HttpClient httpClient, DataContext context)
    {
        _httpClient = httpClient;
        _context = context;
    }


    // פונקציה שתשלח את המחרוזת ל-AI, תנתח את התשובה, ותשמור אותה ב-BD
    //public async Task SaveProjectDescriptionToDB(string s3Key, int employerId)
    //{
    //    var file = await _context.filesList.FirstOrDefaultAsync(f => f.S3Key == s3Key);
    //    if (file == null)
    //    {
    //        throw new Exception("קובץ לא נמצא.");
    //    }

    //    var response = await _httpClient.PostAsJsonAsync("https://api.ai-service.com/parse", new { text = s3Key });

    //    if (!response.IsSuccessStatusCode)
    //    {
    //        throw new Exception("לא הצלחנו לנתח את המידע.");
    //    }

    //    var aiResponse = await response.Content.ReadFromJsonAsync<AIResponse>();
    //    if (aiResponse == null)
    //    {
    //        throw new Exception("AI החזיר תשובה ריקה.");
    //    }

    //    // שמירת תשובת ה-AI לטבלה
    //    _context.AIResponses.Add(aiResponse);
    //    await _context.SaveChangesAsync();

    //    // שמירת הנתונים בטבלת ExtractedData
    //    var extractedData = new ExtractedDataEntity
    //    {
    //        EmployerID = employerId,
    //        AIResponseId = aiResponse.Id, // לוודא ש-AIResponse מכיל ID
    //        S3Key = s3Key,
    //        CreatedAt = DateTime.Now,
    //        UpdatedAt = DateTime.Now
    //    };

    //    _context.extractedDataList.Add(extractedData);
    //    await _context.SaveChangesAsync();
    //}
    public async Task<AIResponse> SaveProjectDescriptionToDB(string fileText, int employerId)
    {
        var response = await _httpClient.PostAsJsonAsync("https://api.ai-service.com/parse", new { text = fileText });

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception("לא הצלחנו לנתח את המידע.");
        }

        var aiResponse = await response.Content.ReadFromJsonAsync<AIResponse>();
        if (aiResponse == null)
        {
            throw new Exception("AI החזיר תשובה ריקה.");
        }

        _context.AIResponses.Add(aiResponse);
        await _context.SaveChangesAsync();

        return aiResponse;
    }


}

