using DevWork.API.Models;
using DevWork.Core.Entities;
using DevWork.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DevWork.Endpoints
{
    public class ExtractedDataEndpoints
    {

        public static void ExtractedData(WebApplication app)
        {



            var extractedDataRoutes = app.MapGroup("/extractedData");



            extractedDataRoutes.MapGet("/", async (
                           [AsParameters] ExtractedDataPostModel model,
    IExtractedDataService service) =>
            {
                var filteredProjects = await service.GetFilteredProjects(
                    model.Experience,
                    model.WorkPlace,
                    model.Languages,
                    model.RemoteWork,
                    model.EnglishLevel
                );
                return Results.Ok(filteredProjects);
            });



            


        }
    }
}
