using DevWork.Core.Entities;
using DevWork.Data;
using DevWork.Service.Iservice;
using Newtonsoft.Json.Linq;
using System.Text.Json;

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
    private async Task<AIResponse> GetAiResponseAsync(string jsonResponse)
    {


        var jsonObject = JObject.Parse(jsonResponse);
        var content = jsonObject["choices"]?[0]?["message"]?["content"]?.ToString();

        if (string.IsNullOrEmpty(content))
            return null;

        var cleanedContent = content
            .Replace("```json", "", StringComparison.OrdinalIgnoreCase)
            .Replace("```", "", StringComparison.OrdinalIgnoreCase)
            .Trim();



        var jObj = JObject.Parse(cleanedContent);

        if (jObj["Languages"] is JArray langArray)
        {
            jObj["Languages"] = string.Join(", ", langArray.Select(l => l.ToString()));
        }

        var aiResponse = jObj.ToObject<AIResponse>();
        return aiResponse;
    }


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
            content = "אתה מודל NLP שמחלץ תיאורים של משרות טכנולוגיות ומחזיר רק את המידע המבוקש בפורמט JSON תקני. אין להחזיר הסברים, ניסוחים יצירתיים או טקסט חופשי – JSON בלבד."
        },
        new {
            role = "user",
            content = "להלן תיאור משרה:\n\n" +
                      fileText + "\n\n" +
                      "חלץ את הנתונים הבאים והחזר אותם אך ורק בפורמט JSON. אל תוסיף הסברים או טקסט נוסף.\n\n" +
                      "הנחיות:\n" +
                      "- \"RemoteWork\": החזר true אם המשרה כוללת עבודה מהבית או עבודה היברידית, אחרת החזר false. אין להחזיר מחרוזת.\n" +
                      "- \"Title\": כותרת המשרה מתוך הטקסט.\n" +
                      "- \"Description\": תיאור המשרה בקצרה.\n" +
                      "- \"Experience\": מספר שנות הניסיון הנמוך ביותר שמופיע בטקסט (רק מספר, לדוגמה: 1, 2, 3). אין להחזיר מילים כמו \"שנה\" או \"שנתיים\".\n" +
                      "- \"WorkPlace\": אחד מהערכים בלבד – 'תל אביב והמרכז', 'ירושלים', 'חיפה והצפון', 'באר שבע והדרום', 'אילת', 'השרון', 'השפלה', 'אחר'.\n" +
                      "- \"Languages\": החזר רשימה של שפות מתוך הרשימה הבאה בלבד (אם קיימות בטקסט): 'Python', 'Java', 'C#', 'C++', 'JavaScript', 'TypeScript', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Go' , 'C' ,'.Net', 'React' \n" +
                      "- \"EnglishLevel\": אחת מהאפשרויות בלבד – 'High', 'Medium', 'Low'.\n\n" +
                      "החזר תשובה בפורמט הבא:\n" +
                      "```json\n" +
                      "{\n" +
                      "  \"Title\": \"בודק/ת תוכנה בכיר/ה\",\n" +
                      "  \"Description\": \"בדיקות פונקציונליות על מערכות WEB.\",\n" +
                      "  \"Experience\": 4,\n" +
                      "  \"WorkPlace\": \"תל אביב והמרכז\",\n" +
                      "  \"Languages\": [\"java\", \"python\"],\n" +
                      "  \"RemoteWork\": true,\n" +
                      "  \"EnglishLevel\": \"High\"\n" +
                      "}\n" +
                      "```"
        }
    }
            };



            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
            {
                Content = JsonContent.Create(prompt)
            };
            request.Headers.Add("Authorization", $"Bearer {_apiKey}");

            var response = await _httpClient.SendAsync(request);

            var responseContent1 = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"לא הצלחנו לנתח את המידע. סטטוס: {response.StatusCode}. תשובה: {responseContent}");
            }
            var responseString = await response.Content.ReadAsStringAsync();

            var aiResponse = await GetAiResponseAsync(responseString);
            if (aiResponse == null)
            {
                throw new Exception("AI החזיר תשובה ריקה.");
            }


            ProcessAiResponse(aiResponse);




            return aiResponse;
        }
        catch (HttpRequestException httpEx)
        {
            throw new Exception("בעיה בחיבור ל-API.", httpEx);
        }
        catch (System.Text.Json.JsonException jsonEx)
        {
            throw new Exception("שגיאה בקריאת התשובה מ-API.", jsonEx);
        }
        catch (Exception ex)
        {
            throw new Exception("שגיאה כלשהי במהלך הפעולה.", ex);
        }
    }


    private void ProcessAiResponse(AIResponse aiResponse)
    {

        var validLanguages = new[] { "python", "java", "c#", "c++", "javascript", "typescript", "php", "ruby", "swift", "kotlin", "go", "c", ".net", "react" };

        if (aiResponse.Languages != null)
        {
            aiResponse.Languages = string.Join(", ", aiResponse.Languages
          .Split(',')
          .Select(language => language.Trim())
          .Where(language => validLanguages.Contains(language, StringComparer.OrdinalIgnoreCase))
          .ToList());


        }

        if (aiResponse.Experience != null)
        {
            aiResponse.Experience = int.TryParse(aiResponse.Experience.ToString(), out int experienceYears)
                ? experienceYears
                : 0;
        }
        else
        {
            aiResponse.Experience = 0;
        }

    }





    public async Task<string> GetAnswerAsync(string userInput)
    {
        try
        {
            var prompt = new
            {
                model = "gpt-4o-mini",
                messages = new[]
                {
                new {
                    role = "system",
                    content = "אתה עוזר וירטואלי באתר DevWork, אתר המיועד למעסיקים בתחום פיתוח תוכנה. אתה עונה אך ורק על שאלות שקשורות לפיתוח תוכנה (למשל: טכנולוגיות, גיוס מפתחים, ניסוח משרות, שפות תכנות וכו') או פרסום משרות באתר. אם נשאלת שאלה שאינה קשורה לנושאים האלה, השב בצורה אדיבה: \"מצטער, אני יכול לעזור רק בנושאים שקשורים לפיתוח תוכנה או לפרסום משרות באתר DevWork.\" אל תסטה מהנחיה זו."
                },
                new {
                    role = "user",
                    content = userInput
                }
            }
            };

            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
            {
                Content = JsonContent.Create(prompt)
            };

            request.Headers.Add("Authorization", $"Bearer {_apiKey}");

            var response = await _httpClient.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"API error: {response.StatusCode} - {responseContent}");
            }

            using var jsonDoc = JsonDocument.Parse(responseContent);
            var messageContent = jsonDoc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            return messageContent ?? "AI החזיר תשובה ריקה.";
        }
        catch (HttpRequestException httpEx)
        {
            throw new Exception("בעיה בחיבור ל-API.", httpEx);
        }
        catch (JsonException jsonEx)
        {
            throw new Exception("שגיאה בקריאת התשובה מ-API.", jsonEx);
        }
        catch (Exception ex)
        {
            throw new Exception("שגיאה כללית במהלך הפעולה.", ex);
        }
    }





}

