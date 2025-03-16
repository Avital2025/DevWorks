using DevWork.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace DevWork.Endpoints
{
    public static class UsersEndpoints
    {

        public static void Users(WebApplication app)
        {

            // Users
            var usersRoutes = app.MapGroup("/users");

            usersRoutes.MapGet("/", async (IUserService service) =>
                Results.Ok(await service.GetAllUsers()));

            usersRoutes.MapGet("/{id:int}", async (int id, IUserService service) =>
            {
                var entity = await service.GetUserById(id);
                return entity is not null ? Results.Ok(entity) : Results.NotFound();
            });


    

        //usersRoutes.MapPost("/login", async (LoginPostModel model, IUserService service) =>
        //{
        //    var user = await service.Authenticate(model.email, model.passwordHash);

        //    if (user == null)
        //    {
        //        return Results.BadRequest(new { Message = "Invalid email or password" });
        //    }
        //    // במקרה שהמשתמש זוהה, החזר את המידע או Token גישה (אם יש לך מערכת כזאת)
        //    return Results.Ok(new { Message = "Login successful", UserId = user.Id });
        //});


        //usersRoutes.MapPut("/login/{id}", async (int id, UserPostModel updatedModel, IUserService service) =>
        // {
        //     var updated = await service.UpdateUser(updatedModel);
        //     if (updated == null)
        //     {
        //         return Results.NotFound();
        //     }
        //     return Results.Ok(updated);
        // });


    }


}
}
