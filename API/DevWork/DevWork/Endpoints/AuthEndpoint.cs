using DevWork.API.Models;
using DevWork.Service.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace DevWork.Endpoints
{
    public class AuthEndpoint
    {
        public static void Auth(WebApplication app)
        {
            var configuration = app.Configuration;

            var usersRoutes = app.MapGroup("/Auth");


            usersRoutes.MapPost("/register", async (UserPostModel model, IUserService service, ITokenService tokenService, IConfiguration configuration) =>
            {
                var existingUser = await service.GetUserByEmail(model.Email);

                if (existingUser != null && existingUser.Role == model.Type)
                {
                    return Results.Conflict("Email already exists with the same role.");
                }

                model.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.PasswordHash);
                var created = await service.AddUser(model);

                var tokenString = tokenService.CreateToken(created, configuration);

                return Results.Created($"/users/{created.Id}", new
                {
                    Token = tokenString,
                    User = new
                    {
                        created.Id,
                        created.FullName,
                        created.Email
                    }
                });
            });

        
            usersRoutes.MapPost("/login", async (LoginPostModel model, IUserService service, ITokenService tokenService, IConfiguration configuration) =>
            {
                var user = await service.Authenticate(model.email, model.passwordHash);
                if (user == null)
                {
                    return Results.NotFound("Invalid email or password" );
            }

                var tokenString = tokenService.CreateToken(user, configuration);

                return Results.Ok(new
                {
                    Token = tokenString,
                    User = new
                    {
                        user.Id,
                        user.FullName,
                        user.Email
                    }
                });
            });

       
            app.MapPost("/validateToken", (HttpContext context) =>
            {
                return Results.Ok(new { valid = true });
            }).RequireAuthorization();



        }
    }
}
