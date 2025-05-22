using DevWork.Data;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using DevWork.Endpoints;
using DevWork.core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Amazon.S3;
using DevWork.Service.IService;
using Microsoft.AspNetCore.Mvc;
using DevWork.Service.Iservice;
using Amazon.Extensions.NETCore.Setup;
using Microsoft.Extensions.Options;
using DevWork.core.Services;
using Microsoft.IdentityModel.Logging;
using System;


Console.WriteLine("Server started");




var builder = WebApplication.CreateBuilder(args);


//-------------------להחזיר במקומי
DotNetEnv.Env.Load();

//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

//builder.Services.AddDbContext<DataContext>(options =>
//    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

//להוסיף את המשתנה ב appsetting
//"DefaultConnection": "Server=bjwgjmq5iij9kwuamglz-mysql.services.clever-cloud.com;Port=3306;Database=bjwgjmq5iij9kwuamglz;User=ucgeulqqiwi99mif;Password=T39db7kYoayCuTSQE8KI;"

//-------------------עד כאן



//-----------------להסיר במקומי
var connectionString = Environment.GetEnvironmentVariable("ConnectionString");

Console.WriteLine("Connection string: " + connectionString);

builder.Services.AddDbContext<DataContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));


//----------- עד כאן



// רישום AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// =========== Add Services ===========
builder.Services.AddScoped<IExtractedDataService, ExtractedDataService>();
builder.Services.AddScoped<IFilesService, FilesService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDataExtractor, DataExtractor>();
builder.Services.AddScoped<IS3Service, S3Service>();
builder.Services.AddScoped<IAIService, AIService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IReminderService, ReminderService>();



builder.Services.AddHttpClient();
// הוספת Swagger
builder.Services.AddEndpointsApiExplorer();


//builder.Services.AddSwaggerGen(options =>
//{
//   options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
//   {
//       Scheme = "Bearer",
//       BearerFormat = "JWT",
//       In = ParameterLocation.Header,
//       Name = "Authorization",
//       Description = "Bearer Authentication with JWT Token",
//       Type = SecuritySchemeType.Http
//   });
//   options.AddSecurityRequirement(new OpenApiSecurityRequirement
//   {
//        {
//            new OpenApiSecurityScheme
//            {
//                Reference = new OpenApiReference
//                {
//                    Id = "Bearer",
//                    Type = ReferenceType.SecurityScheme
//                }
//            },
//            new List<string>()
//        }
//   });
//});



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin() 
                        .AllowAnyMethod()  
                        .AllowAnyHeader());
});






builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],

        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"])),
        NameClaimType = "sub"
    };
    options.Events = new JwtBearerEvents
    {
        OnTokenValidated = context =>
        {
            return Task.CompletedTask;
        },
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine("Authentication failed: " + context.Exception.Message);
            Console.WriteLine("Exception type: " + context.Exception.GetType().Name);
            if (context.Exception.InnerException != null)
            {
                Console.WriteLine("Inner exception: " + context.Exception.InnerException.Message);
            }
            return Task.CompletedTask;
        },
        OnChallenge = context =>
        {
            Console.WriteLine("Challenge issued");
            return Task.CompletedTask;
        }
    };
});


builder.Services.AddAuthorization();

IdentityModelEventSource.ShowPII = true;



builder.Services.AddAWSService<IAmazonS3>();

var app = builder.Build();

app.UseCors("AllowAll");


app.MapGet("/", () => "Hello World!");

app.UseAuthentication();

app.UseAuthorization();


var awsAccessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
var awsSecretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
var region = Amazon.RegionEndpoint.GetBySystemName(Environment.GetEnvironmentVariable("AWS_REGION"));



if (string.IsNullOrEmpty(awsAccessKey) || string.IsNullOrEmpty(awsSecretKey) || region == null)
{
    Console.WriteLine("חסרים פרטי AWS.");
    return;
}

var s3Service = new S3Service(awsAccessKey, awsSecretKey, region);



app.UseSwagger();
app.UseSwaggerUI();


// Minimal API endpoints- In Endpoints Routing.


// =========== endpoints injection ===========
FilesEndpoints.Files(app);
ExtractedDataEndpoints.ExtractedData(app);
UsersEndpoints.Users(app);
AuthEndpoint.Auth(app);
ReminderEndpoints.Reminders(app);








// Start app
app.Run();



