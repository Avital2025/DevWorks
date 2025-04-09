//using DevWork.API.Models;
//using DevWork.Core.Entities;
//using DevWork.Data;
//using Microsoft.EntityFrameworkCore;

//namespace DevWork.Endpoints
//{
//    public class ExtractedDataEndpoints
//    {
//        private readonly DataContext _context;
//        public static void ExtractedData(WebApplication app)
//        {

//            // ExtractedData
//            var extractedDataRoutes = app.MapGroup("/extractedData");


//            extractedDataRoutes.MapGet("/", async (IExtractedDataService service, string? Title, string? Description, int? Experience, string? WorkPlace, string? Languages, bool? RemoteWork, string? EnglishLevel) =>
//            {
//                var filterParams = new AIResponse
//                {
//                    Title = Title,
//                    Description = Description,
//                    Experience = Experience,
//                    WorkPlace = WorkPlace,
//                    Languages = Languages,
//                    RemoteWork = RemoteWork,
//                    EnglishLevel = EnglishLevel
//                };

//                var filteredProjects = await service.GetFilteredProjects(filterParams);
//                return Results.Ok(filteredProjects);
//            }).RequireAuthorization();




//            extractedDataRoutes.MapGet("/{id:int}", async (int id, IExtractedDataService service) =>
//                {
//                    var entity = await service.GetExtractedFileById(id);
//                    return entity is not null ? Results.Ok(entity) : Results.NotFound();
//                }); 

//            //extractedDataRoutes.MapPost("/", async (ExtractedDataPostModel model, IExtractedDataService service) =>
//            //{
//            //    var created = await service.Add(model);
//            //    return Results.Created($"/extractedData/{model.ProjectID}", created);
//            //});

//            //extractedDataRoutes.MapPut("/{id}", async (int id, ExtractedDataPostModel updatedModel, IExtractedDataService service) =>
//            //{
//            //    var updated = await service.UpdateExtractedData(updatedModel);
//            //    if (updated == null)
//            //    {
//            //        return Results.NotFound();
//            //    }
//            //    return Results.Ok(updated);
//            //});


//        }
//    }
//}
using DevWork.API.Models;
using DevWork.Core.Entities;
using DevWork.Data;

namespace DevWork.Endpoints
{
    public class ExtractedDataEndpoints
    {
        public static void ExtractedData(WebApplication app)
        {
            var extractedDataRoutes = app.MapGroup("/extractedData");

            extractedDataRoutes.MapGet("/", async (IExtractedDataService service, HttpContext context) =>
            {
                var experience = context.Request.Query["Experience"].ToString();
                var workplace = context.Request.Query["WorkPlace"].ToString();
                var languages = context.Request.Query["Languages"].ToString();
                var remoteWork = context.Request.Query["RemoteWork"].ToString();
                var englishLevel = context.Request.Query["EnglishLevel"].ToString();

                Console.WriteLine("server");
                // המרת הערכים לפי הצורך (אם הם לא ריקים, המרתם לסוג הנכון)
                int? experienceValue = string.IsNullOrEmpty(experience) ? null : (int?)int.Parse(experience);
                bool? remoteWorkValue = string.IsNullOrEmpty(remoteWork) ? null : (bool?)bool.Parse(remoteWork);

                Console.WriteLine("server");

                var filteredProjects = await service.GetFilteredProjects(experienceValue, workplace, languages, remoteWorkValue, englishLevel);
                return Results.Ok(filteredProjects);
            });



            extractedDataRoutes.MapGet("/{id:int}", async (int id, IExtractedDataService service) =>
            {
                Console.WriteLine("server");
                var entity = await service.GetExtractedFileById(id);
                return entity is not null ? Results.Ok(entity) : Results.NotFound();
            });
        }

    }
}
