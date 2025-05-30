using Amazon.S3.Model;
using Amazon.S3;
using DevWork.API.Models;

using DevWork.Service.Iservice;
using DevWork.core.DTOs;
using DevWork.Core.Dto;

namespace DevWork.Endpoints
{
    public static class FilesEndpoints
    {

        public static void Files(WebApplication app) {

         
            var filesRoutes = app.MapGroup("/files");


            filesRoutes.MapGet("/", async (IFilesService fileService, HttpContext httpContext) =>
            {
                var userId = httpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
                userId = userId?.Trim();

                var token = httpContext.Request.Headers["Authorization"].ToString();
            


                if (string.IsNullOrEmpty(userId))
                {
                    return Results.Unauthorized();
                }

                var files = await fileService.GetUserFilesAsync(userId);


                return Results.Ok(files);
            }).RequireAuthorization();


            filesRoutes.MapGet("/{id:int}", async (int id, IFilesService service) =>
            {
                var entity = await service.GetFileById(id);
                return entity is not null ? Results.Ok(entity) : Results.NotFound();
            });


            filesRoutes.MapPut("/{id:int}/mark-deleted", async (int id, IFilesService service) =>
            {
                var result = await service.DeleteFileAsync(id);
                return result ? Results.Ok() : Results.NotFound();
            });

            filesRoutes.MapPut("/{id:int}/rename", async (int id, RenameFileDto model, IFilesService service) =>
            {
                var result = await service.RenameFileAsync(id, model.NewFileName);
                return result ? Results.Ok() : Results.NotFound();
            });


            filesRoutes.MapPost("/process-file", async (FilesDto model, IFilesService service) =>
            {
                var extractedData = await service.ProcessFile(model.FileUrl,model.EmployerId, model.FileName);
                return Results.Ok(extractedData);
            });

            app.MapPost("/chat", async (ChatRequestDTO request, IAIService aiService) =>
            {
                if (string.IsNullOrWhiteSpace(request.UserInput))
                    return Results.BadRequest("שדה הקלט ריק");
                Console.WriteLine("---------------------------------------------------------");

                var response = await aiService.GetAnswerAsync(request.UserInput);
                return Results.Ok(response);
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

                var fileExists = await service.CheckIfFileExistsAsync(fileName, employerId);

                return Results.Ok(new { exists = fileExists });
            });

            filesRoutes.MapGet("/generate-presigned-url", async (string fileName, IS3Service s3Service) =>
            {
                var presignedUrl = await s3Service.GeneratePreSignedUrlAsync(fileName, HttpVerb.PUT);

                return Results.Ok(new { url = presignedUrl });
            });



        

            filesRoutes.MapGet("/generate-presigned-download-url", async (string fileName, IS3Service s3Service) =>
            {
                var presignedUrl = await s3Service.GeneratePreSignedUrlForDownloadAsync(fileName);
                return Results.Ok(new { url = presignedUrl });
            });






















        }


    }
}
