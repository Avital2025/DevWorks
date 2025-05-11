using Amazon.S3.Model;
using Amazon.S3;
using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.core.DTOs;

namespace DevWork.Endpoints
{
    public static class FilesEndpoints
    {

        public static void Files(WebApplication app) {
            // Files

         
            var filesRoutes = app.MapGroup("/files");

            filesRoutes.MapGet("/", async (IFilesService fileService, HttpContext httpContext) =>
            {
                var userId = httpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                userId = userId?.Trim(); // חשוב!

                var token = httpContext.Request.Headers["Authorization"].ToString();
                foreach (var claim in httpContext.User.Claims)
                {
                    Console.WriteLine($"{claim.Type}: {claim.Value}");
                }

                Console.WriteLine(httpContext.User.Identity.IsAuthenticated);
                Console.WriteLine("Token received: " + token);
                Console.WriteLine($"UserId from claims: '{userId}'");

                if (string.IsNullOrEmpty(userId))
                {
                    return Results.Unauthorized();
                }

                var files = await fileService.GetUserFilesAsync(userId);
                Console.WriteLine($"Files count: {files.Count()}");
                foreach (var file in files)
                {
                    Console.WriteLine($"File: {file.FileName} | EmployerId: {file.EmployerId}");
                }

                return Results.Ok(files);
            }).RequireAuthorization();



            filesRoutes.MapGet("/{id:int}", async (int id, IFilesService service) =>
            {
                var entity = await service.GetFileById(id);
                return entity is not null ? Results.Ok(entity) : Results.NotFound();
            });


            // מחיקה לוגית
            filesRoutes.MapPut("/{id:int}/mark-deleted", async (int id, IFilesService service) =>
            {
                Console.WriteLine("delete");
                var result = await service.DeleteFileAsync(id);
                return result ? Results.Ok() : Results.NotFound();
            });

            // עריכת שם קובץ
            filesRoutes.MapPut("/{id:int}/rename", async (int id, RenameFileDto model, IFilesService service) =>
            {
                var result = await service.RenameFileAsync(id, model.NewFileName);
                return result ? Results.Ok() : Results.NotFound();
            });


            // ✅ הוספת פונקציה לשליחת קובץ לניתוח
            filesRoutes.MapPost("/process-file", async (FilesDto model, IFilesService service) =>
            {
                Console.WriteLine(model.FileUrl);
                var extractedData = await service.ProcessFile(model.FileUrl,model.EmployerId, model.FileName);
                return Results.Ok(extractedData);
            });






            filesRoutes.MapPut("/{id}", async (int id, FilesPostModel updatedModel, IFilesService service) =>
            {
                var updated = await service.UpdateFile(updatedModel);
                if (updated == null)
                {
                    return Results.NotFound();
                }
                return Results.Ok(updated);
            });

            filesRoutes.MapGet("/check-file-exists", async (string fileName, int employerId, IFilesService service) =>
            {
                Console.WriteLine("checkinggg");
                Console.WriteLine(fileName);
                Console.WriteLine(employerId);
                // קריאה לפונקציה בסרביס לבדיקת אם הקובץ קיים
                var fileExists = await service.CheckIfFileExistsAsync(fileName, employerId);

                // מחזיר תשובה אם הקובץ קיים או לא
                return Results.Ok(new { exists = fileExists });
            });

            // הוספת פונקציה להפקת presigned URL
            filesRoutes.MapGet("/generate-presigned-url", async (string fileName, IS3Service s3Service) =>
            {
                Console.WriteLine("hereeeeeeeeeeeeeeeeeeeeeeeeeeee");
                var presignedUrl = await s3Service.GeneratePreSignedUrlAsync(fileName, HttpVerb.PUT);;

                return Results.Ok(new { url = presignedUrl });
            });



        

            // הוספת פונקציה להפקת presigned URL להורדה (GET)
            filesRoutes.MapGet("/generate-presigned-download-url", async (string fileName, IS3Service s3Service) =>
            {
                Console.WriteLine("//////////////////////////Generating PreSigned URL for GET...");
             

                // הפקת ה-URL עם פעולה של GET
                var presignedUrl = await s3Service.GeneratePreSignedUrlForDownloadAsync(fileName);
                Console.WriteLine($"----------------------------------URL being used: {presignedUrl}");
                // לוג עבור ה-URL שנוצר
                Console.WriteLine($"Generated PreSigned URL: \"{presignedUrl}\"");

                // החזרת ה-URL ב-Response
                return Results.Ok(new { url = presignedUrl });
            });






















        }


    }
}
