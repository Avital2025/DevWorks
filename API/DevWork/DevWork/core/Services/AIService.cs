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
    //public async Task<AIResponse> SaveProjectDescriptionToDB(string fileText)
    //{
    //    var response = await _httpClient.PostAsJsonAsync("https://api.ai-service.com/parse", new { text = fileText });

    //    if (!response.IsSuccessStatusCode)
    //    {
    //        throw new Exception("לא הצלחנו לנתח את המידע.");
    //    }

    //    var aiResponse = await response.Content.ReadFromJsonAsync<AIResponse>();
    //    if (aiResponse == null)
    //    {
    //        throw new Exception("AI החזיר תשובה ריקה.");
    //    }

    //    _context.AIResponses.Add(aiResponse);
    //    await _context.SaveChangesAsync();

    //    return aiResponse;
    //}

    public async Task<AIResponse> SaveProjectDescriptionToDB(string fileText)
    {
        var prompt = new
        {
            model = "gpt-4",
            messages = new[]
            {
            new { role = "system", content = "אתה מודל NLP שמחפש תיאורים של משרות טכנולוגיות ומחזיר רק את המידע המבוקש בפורמט JSON." },
            new {
                role = "user",
                content = $"נתון התיאור הבא של משרה:\n\n{fileText}\n\n" +
                          "חלץ את הנתונים הבאים והחזר אותם בפורמט JSON:\n" +
                          "- כותרת המשרה (Title)\n" +
                          "- תיאור המשרה (Description)\n" +
                          "- שנות ניסיון נדרשות (Experience), החזר את מספר שנות הניסיון הנמוך ביותר הקיים בטקסט, אם יש, אם יש כמה פעמים שנות ניסיון- תביא את הערך הנמוך ביותר מתוכם.  תחזיר כערך מספרי בלבד (למשל: 1, 2, 3). אל תחזיר טקסט כמו \"שנה\", \"שנתיים\", אלא את המספר בלבד \n" +
                          "- מקום העבודה (WorkPlace), אחד מהערכים: 'תל אביב והמרכז', 'ירושלים', 'חיפה והצפון', 'באר שבע והדרום', 'אילת', 'השרון', 'השפלה', 'אחר'\n" +
                          "- שפות (Languages), החזר רק שפות מתוך הרשימה: c, c++, java, cobol, python, javascript, ruby, php, .net\n" +
                          "- עבודה מרחוק (RemoteWork), אחת מהאפשרויות: 'כן', 'לא', 'היברידי'\n" +
                          "- רמת אנגלית (EnglishLevel), אחת מהאפשרויות: 'High', 'Medium', 'Low'\n\n" +
                          "החזר תשובה בפורמט JSON לדוגמה:\n```json\n{\n  \"Title\": \"בודק/ת תוכנה בכיר/ה\",\n  \"Description\": \"בדיקות פונקציונליות על מערכות WEB.\",\n  \"Experience\": 4,\n  \"WorkPlace\": \"תל אביב והמרכז\",\n  \"Languages\": [\"Java\", \"SQL\"],\n  \"RemoteWork\": \"היברידי\",\n  \"EnglishLevel\": \"High\"\n}\n```"
            }
        }
        };

        var response = await _httpClient.PostAsJsonAsync("https://api.openai.com/v1/chat/completions", prompt);

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception("לא הצלחנו לנתח את המידע.");
        }

        var aiResponse = await response.Content.ReadFromJsonAsync<AIResponse>();
        if (aiResponse == null)
        {
            throw new Exception("AI החזיר תשובה ריקה.");
        }

        aiResponse.Languages = aiResponse.Languages != null
    ? string.Join(", ", aiResponse.Languages)
    : null;

        if (aiResponse.Experience != null)
        {
            aiResponse.Experience = int.TryParse(aiResponse.Experience.ToString(), out int experienceYears) ? experienceYears : 0;
        }
        else
        {
            aiResponse.Experience = 0; // אם אין מידע, מגדירים 0
        }

        _context.AIResponses.Add(aiResponse);
        await _context.SaveChangesAsync();

        return aiResponse;
    }



}

