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

                if (string.IsNullOrEmpty(userId))
                    return Results.Unauthorized();

                dto.UserId = int.Parse(userId); 
                var reminder = await service.CreateAsync(dto);
                return Results.Created($"/reminders/{reminder.Id}", reminder);
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

                if (string.IsNullOrEmpty(userId))
                    return Results.Unauthorized();

                var results = await service.GetShownAsync(int.Parse(userId)); // העברת ה-UserId לשירות
                return Results.Ok(results);
            }).RequireAuthorization();

            remindersRoutes.MapGet("/due-now", async (IReminderService service) =>
            {
                var results = await service.GetDueNowAsync();
                return Results.Ok(results);
            }).RequireAuthorization();

    

        }
    }
}
