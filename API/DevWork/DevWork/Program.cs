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


Console.WriteLine("Server started");




var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<DataContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

// רישום AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile)); 

// =========== Add Services ===========
builder.Services.AddScoped<IExtractedDataService, ExtractedDataService>();
builder.Services.AddScoped<IFilesService, FilesService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDataExtractor, DataExtractor>();
builder.Services.AddScoped<IS3Service, S3Service>();
builder.Services.AddScoped<IAIService, AIService>();




builder.Services.AddHttpClient();
// הוספת Swagger
builder.Services.AddEndpointsApiExplorer();

//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new OpenApiInfo
//    { Title = "HireSphere API",
//        Version = "v1" ,
//        Description = "API for managing job candidates",
//        Contact = new OpenApiContact
//        {
//            Name = "Avital",
//            Email = "A0583273344@gmail.com"
//        }
//    });
//});


 builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin() // אפשר לכל מקור לגשת
                        .AllowAnyMethod()  // אפשר כל שיטה (GET, POST וכו')
                        .AllowAnyHeader()); // אפשר כל כותרת
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
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
        };
    });

builder.Services.AddAuthorization();




builder.Services.AddAWSService<IAmazonS3>();

var app = builder.Build();

app.UseCors("AllowAll");


app.MapGet("/", () => "Hello World!");


DotNetEnv.Env.Load();

// אל תיצור את ה-s3Client שוב כאן, כי יש לך אותו ב-S3Service כבר
var awsAccessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
var awsSecretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
var region = Amazon.RegionEndpoint.GetBySystemName(Environment.GetEnvironmentVariable("AWS_REGION"));



if (string.IsNullOrEmpty(awsAccessKey) || string.IsNullOrEmpty(awsSecretKey) || region == null)
{
    // הוספת טיפול בשגיאה אם יש משהו חסר
    Console.WriteLine("חסרים פרטי AWS.");
    return;
}

var s3Service = new S3Service(awsAccessKey, awsSecretKey, region);

// הוספת אפשרות להעביר contentType בקונטקסט של ה-URL
//app.MapGet("/generate-presigned-url", ([FromQuery] string fileName, [FromQuery] string contentType) =>
//{
//    var presignedUrl = s3Service.GeneratePresignedUrl(fileName, contentType);
//    return Results.Ok(new { url = presignedUrl });
//});



app.UseAuthentication();

app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI();


// Minimal API endpoints- In Endpoints Routing.


// =========== endpoints injection ===========
FilesEndpoints.Files(app);
ExtractedDataEndpoints.ExtractedData(app);
UsersEndpoints.Users(app);
AuthEndpoint.Auth(app);






// Start app
app.Run();



