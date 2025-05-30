using DevWork.core.DTOs;
using DevWork.Core.Dto;
using DevWork.Service.Iservice;
using Microsoft.AspNetCore.Mvc;

namespace DevWork.Endpoints
{
    public class ChatBotEndpoints
    {



public static void AI(WebApplication app)
    {
        Console.WriteLine("endpoint1");

        var AIRoutes = app.MapGroup("/chat");
        Console.WriteLine("endpoint2");

            AIRoutes.MapPost("/", async ([FromBody] ChatRequestDTO request, IAIService aiService) =>
            {
                Console.WriteLine("endpointttt3");
                var response = await aiService.GetAnswerAsync(request.UserInput);
                return Results.Ok(response);
            });
        }

}
}
