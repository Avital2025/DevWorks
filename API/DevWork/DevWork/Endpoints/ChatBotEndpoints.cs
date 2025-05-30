using DevWork.Core.Dto;
using DevWork.Service.Iservice;

namespace DevWork.Endpoints
{
    public class ChatBotEndpoints
    {
        public static void AI(WebApplication app)
        {

            var AIRoutes = app.MapGroup("/chat");
            Console.WriteLine("endpoint");
            AIRoutes.MapPost("/", async( string userInput, IAIService aiService) =>
          {

              Console.WriteLine("endpointttt");
              var response = await aiService.GetAnswerAsync(userInput);
              return Results.Ok(response);

          });



        }
    }
}
