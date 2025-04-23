using Amazon.S3.Model;
using Amazon.S3;
using DevWork.API.Models;
using DevWork.Core.Dto;

namespace DevWork.Endpoints
{
    public static class FilesEndpoints
    {

        public static void Files(WebApplication app) {
            // Files

         
            var filesRoutes = app.MapGroup("/files");

            //filesRoutes.MapGet("/", async (IFilesService fileService, HttpContext httpContext) =>
            //{
            //    var userId = httpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
            //    var token = httpContext.Request.Headers["Authorization"].ToString();
            //    foreach (var claim in httpContext.User.Claims)
            //    {
            //        Console.WriteLine($"{claim.Type}: {claim.Value}"); }
            //    Console.WriteLine(httpContext.User.Identity.IsAuthenticated);
            //    Console.WriteLine("Token received: " + token);
            //    if (string.IsNullOrEmpty(userId))
            //    {   
            //        return Results.Unauthorized();
            //    }

            //    var files = await fileService.GetUserFilesAsync(userId);
            //    return Results.Ok(files);
            //});
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
            });



            filesRoutes.MapGet("/{id:int}", async (int id, IFilesService service) =>
            {
                var entity = await service.GetFileById(id);
                return entity is not null ? Results.Ok(entity) : Results.NotFound();
            });

            //filesRoutes.MapPost("/", async (FilesPostModel model, IFilesService service) =>
            //{
            //    var created = await service.AddFile(model);
            //    return Results.Created($"/files/{model.Id}", created);
            //});


            // פונקציה להורדת הקובץ
            //filesRoutes.MapGet("/download/{id:int}", async (int id, IFilesService service) =>
            //{
            //    var presignedUrl = await service.GetDownloadUrl(id);
            //    return presignedUrl is not null ? Results.Ok(new { url = presignedUrl }) : Results.NotFound();
            //});


            // ✅ הוספת פונקציה לשליחת קובץ לניתוח
            filesRoutes.MapPost("/process-file", async (FilesDto model, IFilesService service) =>
            {
                Console.WriteLine("here???");
                Console.WriteLine(model.FileUrl);
                Console.WriteLine("here???");
                var extractedData = await service.ProcessFile(model.FileUrl,model.EmployerId );
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
