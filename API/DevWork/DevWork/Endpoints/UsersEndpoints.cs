using DevWork.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;

namespace DevWork.Endpoints
{
    public static class UsersEndpoints
    {

        public static void Users(WebApplication app)
        {

            var usersRoutes = app.MapGroup("/users");



            usersRoutes.MapGet("/", async (IUserService service) =>
                Results.Ok(await service.GetAllUsers()));

            usersRoutes.MapGet("/{id:int}", async (int id, IUserService service) =>
            {
                var entity = await service.GetUserById(id);
                return entity is not null ? Results.Ok(entity) : Results.NotFound();
            }).RequireAuthorization();

            usersRoutes.MapPut("/update-credentials", async (
      UserUpdateCredentialsModel model,
      ClaimsPrincipal user,
      IUserService service) =>
            {

                var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier) ?? user.FindFirst("sub");
                if (userIdClaim == null)
                {
                    return Results.Unauthorized();
                }
                var userId = int.Parse(userIdClaim.Value);

                var emailClaim = user.FindFirst(ClaimTypes.Email) ?? user.FindFirst("email");
                if (emailClaim == null)
                {
                    return Results.Unauthorized();
                }
                var email = emailClaim.Value;

                var updateModel = new UserUpdateCredentialsModel
                {
                    Email = email,
                    FullName = model.FullName,
                    PasswordHash = model.PasswordHash
                };


                var result = await service.UpdateCredentialsAsync(userId, updateModel);

                return result ? Results.Ok() : Results.BadRequest("Update failed");
            }).RequireAuthorization();




        }


    }
}
