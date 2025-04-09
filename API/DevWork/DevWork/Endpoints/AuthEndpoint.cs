using DevWork.API.Models;
using DevWork.Service.IService;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace DevWork.Endpoints
{
    public class AuthEndpoint
    {
        public static void Auth(WebApplication app)
        {
            var configuration = app.Configuration;  // גישה ל-IConfiguration

            var usersRoutes = app.MapGroup("/Auth");
            //usersRoutes.MapPost("/register", async (UserPostModel model, IUserService service) =>
            //{
            //    model.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.PasswordHash);
            //    var created = await service.AddUser(model);

            //    return Results.Created($"/users/{model.Id}", created);

            //});
            usersRoutes.MapPost("/register", async (UserPostModel model, IUserService service, ITokenService tokenService, IConfiguration configuration) =>
            {
                var existingUser = await service.GetUserByEmail(model.Email);

                if (existingUser != null && existingUser.Role == model.Type)
                {
                    return Results.Conflict("Email already exists with the same role.");
                }

                model.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.PasswordHash);
                var created = await service.AddUser(model);

                // יצירת טוקן
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

            //usersRoutes.MapPost("/register", async (UserPostModel model, IUserService service) =>
            //{
            //    var existingUser = await service.GetUserByEmail(model.Email);

            //    if (existingUser != null && existingUser.Role == model.Type)
            //    {
            //        return Results.Conflict("Email already exists with the same role.");
            //    }

            //    model.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.PasswordHash);
            //    var created = await service.AddUser(model);

            //    // יצירת טוקן כמו בהתחברות
            //    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("JWT:Key")));
            //    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            //    var tokenOptions = new JwtSecurityToken(
            //        issuer: configuration.GetValue<string>("JWT:Issuer"),
            //        audience: configuration.GetValue<string>("JWT:Audience"),
            //        expires: DateTime.Now.AddMinutes(6),
            //        signingCredentials: signinCredentials
            //    );
            //    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            //    return Results.Created($"/users/{created.Id}", new
            //    {
            //        Token = tokenString,  // החזרת הטוקן
            //        User = new
            //        {
            //            created.Id,
            //            created.FullName,
            //            created.Email
            //        }
            //    });
            //});



            //usersRoutes.MapPost("/login", async (LoginPostModel model, IUserService service) =>
            //{
            //    var user = await service.Authenticate(model.email, model.passwordHash);


            //    if (user == null)
            //    {
            //        // אם המשתמש לא נמצא, החזר שגיאה
            //        return Results.NotFound("Invalid email or password" );
            //    }

            //    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("JWT:Key")));
            //    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            //    var tokenOptions = new JwtSecurityToken(
            //        issuer: configuration.GetValue<string>("JWT:Issuer"),
            //        audience: configuration.GetValue<string>("JWT:Audience"),
            //        expires: DateTime.Now.AddMinutes(6),
            //        signingCredentials: signinCredentials
            //    );

            //    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            //    // החזרת הטוקן
            //    return Results.Ok(new { Token = tokenString });
            //});
            usersRoutes.MapPost("/login", async (LoginPostModel model, IUserService service, ITokenService tokenService, IConfiguration configuration) =>
            {
                var user = await service.Authenticate(model.email, model.passwordHash);  // כאן נשלחת הסיסמה כפי שהיא נכתבה
                if (user == null)
                {
                    // אם המשתמש לא נמצא, החזר שגיאה
                    return Results.NotFound("Invalid email or password" );
            }

                // יצירת הטוקן
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


            //usersRoutes.MapPost("/login", async (LoginPostModel model, IUserService service) =>
            //{
            //    var user = await service.Authenticate(model.email, model.passwordHash);  // כאן נשלחת הסיסמה כפי שהיא נכתב
            //    if (user == null)
            //    {
            //        // אם המשתמש לא נמצא, החזר שגיאה
            //        return Results.NotFound("Invalid email or password");
            //    }
            //    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("JWT:Key")));
            //    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            //    var tokenOptions = new JwtSecurityToken(
            //        issuer: configuration.GetValue<string>("JWT:Issuer"),
            //        audience: configuration.GetValue<string>("JWT:Audience"),
            //        expires: DateTime.Now.AddMinutes(6),
            //        signingCredentials: signinCredentials
            //    );
            //    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            //    // החזרת הטוקן
            //    return Results.Ok(new
            //    {
            //        Token = tokenString,
            //        User = new
            //        {
            //            user.Id,
            //            user.FullName,
            //            user.Email
            //        }
            //    });

            //});

        }
    }
}
