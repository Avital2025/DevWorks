using DevWork.Core.Entities;
using DevWork.Data;
using DevWork.Service.Iservice;

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
    public async Task SaveProjectDescriptionToDB(string description, int employerId)
    {
        var response = await _httpClient.PostAsJsonAsync("https://api.ai-service.com/parse", new { text = description });

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception("לא הצלחנו לנתח את המידע.");
        }

        var aiResponse = await response.Content.ReadFromJsonAsync<AIResponse>();
        if (aiResponse == null)
        {
            throw new Exception("AI החזיר תשובה ריקה.");
        }

        var extractedData = new ExtractedDataEntity
        {
            ProjectTitle = aiResponse.Title ?? "לא צוין",
            ProjectDescription = aiResponse.Description ?? "לא צוין",
            RequiredExperience = aiResponse.Experience ?? 0,
            EmployerID = employerId, // מקבל ID מהמשתמש
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            IsActive = true
        };

        _context.extractedDataList.Add(extractedData);
        await _context.SaveChangesAsync();
    }
}
