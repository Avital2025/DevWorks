﻿using DevWork.Core.Entities;
using DevWork.Data;
using DevWork.Service.Iservice;
using System.Linq;

public class AIService : IAIService
{
    private readonly HttpClient _httpClient;
    private readonly DataContext _context;
    private readonly string _apiKey;

    public AIService(HttpClient httpClient, DataContext context)
    {
        _httpClient = httpClient;
        _context = context;
        _apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY")
            ?? throw new Exception("API Key is missing!");
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


    //====================
    //public async Task<AIResponse> SaveProjectDescriptionToDB(string fileText)
    //{
    //    var prompt = new
    //    {
    //        model = "gpt-4",
    //        messages = new[]
    //        {
    //        new { role = "system", content = "אתה מודל NLP שמחפש תיאורים של משרות טכנולוגיות ומחזיר רק את המידע המבוקש בפורמט JSON." },
    //        new {
    //            role = "user",
    //            content = $"נתון התיאור הבא של משרה:\n\n{fileText}\n\n" +
    //                      "חלץ את הנתונים הבאים והחזר אותם בפורמט JSON:\n" +
    //                      "- כותרת המשרה (Title)\n" +
    //                      "- תיאור המשרה (Description)\n" +
    //                      "- שנות ניסיון נדרשות (Experience), החזר את מספר שנות הניסיון הנמוך ביותר הקיים בטקסט, אם יש, אם יש כמה פעמים שנות ניסיון- תביא את הערך הנמוך ביותר מתוכם.  תחזיר כערך מספרי בלבד (למשל: 1, 2, 3). אל תחזיר טקסט כמו \"שנה\", \"שנתיים\", אלא את המספר בלבד \n" +
    //                      "- מקום העבודה (WorkPlace), אחד מהערכים: 'תל אביב והמרכז', 'ירושלים', 'חיפה והצפון', 'באר שבע והדרום', 'אילת', 'השרון', 'השפלה', 'אחר'\n" +
    //                      "- שפות (Languages), החזר רק שפות מתוך הרשימה: c, c++, java, cobol, python, javascript, ruby, php, .net\n" +
    //                      "- עבודה מרחוק (RemoteWork), אחת מהאפשרויות: 'כן', 'לא', 'היברידי'\n" +
    //                      "- רמת אנגלית (EnglishLevel), אחת מהאפשרויות: 'High', 'Medium', 'Low'\n\n" +
    //                      "החזר תשובה בפורמט JSON לדוגמה:\n```json\n{\n  \"Title\": \"בודק/ת תוכנה בכיר/ה\",\n  \"Description\": \"בדיקות פונקציונליות על מערכות WEB.\",\n  \"Experience\": 4,\n  \"WorkPlace\": \"תל אביב והמרכז\",\n  \"Languages\": [\"Java\", \"SQL\"],\n  \"RemoteWork\": \"היברידי\",\n  \"EnglishLevel\": \"High\"\n}\n```"
    //        }
    //    }
    //    };

    //    var response = await _httpClient.PostAsJsonAsync("https://api.openai.com/v1/chat/completions", prompt);

    //    if (!response.IsSuccessStatusCode)
    //    {
    //        throw new Exception("לא הצלחנו לנתח את המידע.");
    //    }

    //    var aiResponse = await response.Content.ReadFromJsonAsync<AIResponse>();
    //    if (aiResponse == null)
    //    {
    //        throw new Exception("AI החזיר תשובה ריקה.");
    //    }

    //    aiResponse.Languages = aiResponse.Languages != null
    //? string.Join(", ", aiResponse.Languages)
    //: null;

    //    if (aiResponse.Experience != null)
    //    {
    //        aiResponse.Experience = int.TryParse(aiResponse.Experience.ToString(), out int experienceYears) ? experienceYears : 0;
    //    }
    //    else
    //    {
    //        aiResponse.Experience = 0; // אם אין מידע, מגדירים 0
    //    }

    //    _context.AIResponses.Add(aiResponse);
    //    await _context.SaveChangesAsync();

    //    return aiResponse;
    //}


    //public async Task<AIResponse> SaveProjectDescriptionToDB(string fileText)
    //{
    //    var prompt = new
    //    {
    //        model = "gpt-3.5",
    //        messages = new[] {
    //        new {
    //            role = "system",
    //            content = "אתה מודל NLP שמחפש תיאורים של משרות טכנולוגיות ומחזיר רק את המידע המבוקש בפורמט JSON."
    //        },
    //        new {
    //            role = "user",
    //            content = $"נתון התיאור הבא של משרה:\n\n{fileText}\n\n" +
    //                      "חלץ את הנתונים הבאים והחזר אותם בפורמט JSON:\n" +
    //                      "- כותרת המשרה (Title)\n" +
    //                      "- תיאור המשרה (Description)\n" +
    //                      "- שנות ניסיון נדרשות (Experience), החזר את מספר שנות הניסיון הנמוך ביותר הקיים בטקסט, אם יש, אם יש כמה פעמים שנות ניסיון- תביא את הערך הנמוך ביותר מתוכם.  תחזיר כערך מספרי בלבד (למשל: 1, 2, 3). אל תחזיר טקסט כמו \"שנה\", \"שנתיים\", אלא את המספר בלבד \n" +
    //                      "- מקום העבודה (WorkPlace), אחד מהערכים: 'תל אביב והמרכז', 'ירושלים', 'חיפה והצפון', 'באר שבע והדרום', 'אילת', 'השרון', 'השפלה', 'אחר'\n" +
    //                      "- שפות (Languages), החזר רק שפות מתוך הרשימה: c, c++, java, cobol, python, javascript, ruby, php, .net\n" +
    //                      "- עבודה מרחוק (RemoteWork), אחת מהאפשרויות: 'כן', 'לא', 'היברידי'\n" +
    //                      "- רמת אנגלית (EnglishLevel), אחת מהאפשרויות: 'High', 'Medium', 'Low'\n\n" +
    //                      "החזר תשובה בפורמט JSON לדוגמה:\n```json\n{\n  \"Title\": \"בודק/ת תוכנה בכיר/ה\",\n  \"Description\": \"בדיקות פונקציונליות על מערכות WEB.\",\n  \"Experience\": 4,\n  \"WorkPlace\": \"תל אביב והמרכז\",\n  \"Languages\": [\"Java\", \"SQL\"],\n  \"RemoteWork\": \"היברידי\",\n  \"EnglishLevel\": \"High\"\n}\n```"
    //        }
    //    }
    //    };


    //    // הוספת ה-API Key לכותרת
    //    var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
    //    {
    //        Content = JsonContent.Create(prompt)
    //    };
    //    request.Headers.Add("Authorization", $"Bearer {_apiKey}");
    //    Console.WriteLine($"Using API Key: {_apiKey}");

    //    var response = await _httpClient.SendAsync(request);

    //    if (!response.IsSuccessStatusCode)
    //    {
    //        throw new Exception($"לא הצלחנו לנתח את המידע. סטטוס: {response.StatusCode}");
    //    }

    //    var aiResponse = await response.Content.ReadFromJsonAsync<AIResponse>();
    //    if (aiResponse == null)
    //    {
    //        throw new Exception("AI החזיר תשובה ריקה.");
    //    }

    //    // עיבוד תשובה
    //    ProcessAiResponse(aiResponse);

    //    // שמירה למסד הנתונים
    //    _context.AIResponses.Add(aiResponse);
    //    await _context.SaveChangesAsync();

    //    return aiResponse;
    //}
    public async Task<AIResponse> SaveProjectDescriptionToDB(string fileText)
    {
        try
        {
            var prompt = new
            {
                model = "gpt-4o-mini",
                messages = new[] {
                new {
                    role = "system",
                    content = "אתה מודל NLP שמחפש תיאורים של משרות טכנולוגיות ומחזיר רק את המידע המבוקש בפורמט JSON."
                },
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

            // הוספת ה-API Key לכותרת
            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
            {
                Content = JsonContent.Create(prompt)
            };
            request.Headers.Add("Authorization", $"Bearer {_apiKey}");
            Console.WriteLine($"Using API Key: {_apiKey}");

            // שליחת הבקשה ל-API
            var response = await _httpClient.SendAsync(request);
            Console.WriteLine("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAשש");

            var responseContent1 = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"Response Content: {responseContent1}" + "קמד");

            // טיפול בתשובה שלא הצליחה
            if (!response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"לא הצלחנו לנתח את המידע. סטטוס: {response.StatusCode}. תשובה: {responseContent}");
            }
            Console.WriteLine("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
            // קריאת התשובה מ-API

            var aiResponse = await response.Content.ReadFromJsonAsync<AIResponse>();
            Console.WriteLine("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
            if (aiResponse == null)
            {
                throw new Exception("AI החזיר תשובה ריקה.");
            }
            Console.WriteLine("--------------------------***********************************");
            // עיבוד התשובה
          
            ProcessAiResponse(aiResponse);
            Console.WriteLine("-3333333333333333333333333333-***********************************");


            //_context.AIResponses.Add(aiResponse);
            //await _context.SaveChangesAsync();

            return aiResponse;
        }
        catch (HttpRequestException httpEx)
        {
            // טיפול בשגיאות רשת (כגון בעיות חיבור ל-API)
            Console.WriteLine($"שגיאה בחיבור ל-API: {httpEx.Message}");
            throw new Exception("בעיה בחיבור ל-API.", httpEx);
        }
        catch (System.Text.Json.JsonException jsonEx)
        {
            // טיפול בשגיאות parsing של JSON
            Console.WriteLine($"שגיאה בקריאת התשובה מ-API: {jsonEx.Message}");
            throw new Exception("שגיאה בקריאת התשובה מ-API.", jsonEx);
        }
        catch (Exception ex)
        {
            // טיפול בשגיאות כלליות
            Console.WriteLine($"שגיאה כללית: {ex.Message}");
            throw new Exception("שגיאה כלשהי במהלך הפעולה.", ex);
        }
    }

    private void ProcessAiResponse(AIResponse aiResponse)
    {
        Console.WriteLine("2222222222222222222222222***********************************");
        // עיבוד שפות

        // רשימת השפות התקניות
        var validLanguages = new[] { "c", "c++", "java", "cobol", "python", "javascript", "ruby", "php", ".net" };

        if (aiResponse.Languages != null)
        {
            aiResponse.Languages = string.Join(", ", aiResponse.Languages
                .Split(',') // מפריד את המיתר לפי פסיקים
                .Select(language => language.Trim().ToLower()) // מנקה רווחים וממיר לאותיות קטנות
                .Where(language => validLanguages.Contains(language)) // מסנן לפי שפות תקניות
                .ToList());
        }



        // המרת ניסיון
        if (aiResponse.Experience != null)
        {
            aiResponse.Experience = int.TryParse(aiResponse.Experience.ToString(), out int experienceYears)
                ? experienceYears
                : 0;
        }
        else
        {
            aiResponse.Experience = 0; // אם אין מידע, מגדירים 0
        }
    }

}

