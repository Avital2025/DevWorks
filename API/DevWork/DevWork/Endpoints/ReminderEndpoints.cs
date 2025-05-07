using System.Security.Claims;
using DevWork.core.DTOs;
using DevWork.core.Services;
using DevWork.Service.IService;

namespace DevWork.Endpoints
{
    public static class ReminderEndpoints
    {
        public static void Reminders(WebApplication app)
        {
            var remindersRoutes = app.MapGroup("/reminders");

            remindersRoutes.MapPost("/", async (
                ReminderCreateDto dto,
                IReminderService service,
                HttpContext httpContext) =>
            {
                var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value?.Trim();
                var token = httpContext.Request.Headers["Authorization"].ToString();

                foreach (var claim in httpContext.User.Claims)
                {
                    Console.WriteLine($"{claim.Type}: {claim.Value}");
                }

                Console.WriteLine(httpContext.User.Identity.IsAuthenticated);
                Console.WriteLine("Token received: " + token);
                Console.WriteLine($"UserId from claims: '{userId}'");

                if (string.IsNullOrEmpty(userId))
                    return Results.Unauthorized();

                if (!int.TryParse(userId, out int parsedId))
                    return Results.BadRequest("Invalid user id");

                dto.UserId = parsedId;
                var reminder = await service.CreateAsync(dto);
                return Results.Created($"/reminders/{reminder.Id}", reminder);
            }).RequireAuthorization();

            remindersRoutes.MapGet("/pending", async (
                string triggerType,
                int triggerTargetId,
                IReminderService service) =>
            {
                var results = await service.GetPendingByTriggerAsync(triggerType, triggerTargetId);
                return Results.Ok(results);
            }).RequireAuthorization();

            remindersRoutes.MapPost("/{id:int}/done", async (
                int id,
                IReminderService service) =>
            {
                await service.SetAsDoneAsync(id);
                return Results.NoContent();
            }).RequireAuthorization();

            remindersRoutes.MapGet("/shown", async (
                IReminderService service,
                HttpContext httpContext) =>
            {
                var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value?.Trim();
                var token = httpContext.Request.Headers["Authorization"].ToString();

                Console.WriteLine("Token received: " + token);
                Console.WriteLine($"UserId from claims: '{userId}'");

                if (string.IsNullOrEmpty(userId))
                    return Results.Unauthorized();

                var results = await service.GetShownAsync(); // אם תרצי למיין לפי userId, תעדכני את הסרביס
                return Results.Ok(results);
            }).RequireAuthorization();

            remindersRoutes.MapGet("/due-now", async (IReminderService service) =>
            {
                var results = await service.GetDueNowAsync();
                return Results.Ok(results);
            }).RequireAuthorization();

            remindersRoutes.MapDelete("/{id:int}", async (
                int id,
                IReminderService service) =>
            {
                // אופציונלי: service.DeleteAsync(id);
                return Results.NoContent();
            }).RequireAuthorization();
        }
    }
}
