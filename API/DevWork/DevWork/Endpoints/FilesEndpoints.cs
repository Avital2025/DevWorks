using DevWork.API.Models;
using DevWork.Core.Dto;

namespace DevWork.Endpoints
{
    public static class FilesEndpoints
    {

        public static void Files(WebApplication app) {
            // Files

         
            var filesRoutes = app.MapGroup("/files");

            filesRoutes.MapGet("/", async (IFilesService service) =>
                Results.Ok(await service.GetAllFiles()));

            filesRoutes.MapGet("/{id:int}", async (int id, IFilesService service) =>
            {
                var entity = await service.GetFileById(id);
                return entity is not null ? Results.Ok(entity) : Results.NotFound();
            });

            filesRoutes.MapPost("/", async (FilesPostModel model, IFilesService service) =>
            {
                var created = await service.AddFile(model);
                return Results.Created($"/files/{model.Id}", created);
            });

            // ✅ הוספת פונקציה לשליחת קובץ לניתוח
            filesRoutes.MapPost("/process-file", async (FilesDto model, IFilesService service) =>
            {
                
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
        

     
        }
       

    }
}
