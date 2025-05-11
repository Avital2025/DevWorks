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

            extractedDataRoutes.MapGet("/", async (IExtractedDataService service, HttpContext context) =>
            {
                var experience = context.Request.Query["Experience"].ToString();
                var workplace = context.Request.Query["WorkPlace"].ToString();
                var languages = context.Request.Query["Languages"].ToString();
                var remoteWork = context.Request.Query["RemoteWork"].ToString();
                var englishLevel = context.Request.Query["EnglishLevel"].ToString();

                int? experienceValue = string.IsNullOrEmpty(experience) ? null : (int?)int.Parse(experience);
                bool? remoteWorkValue = string.IsNullOrEmpty(remoteWork) ? null : (bool?)bool.Parse(remoteWork);

                var filteredProjects = await service.GetFilteredProjects(experienceValue, workplace, languages, remoteWorkValue, englishLevel);
                return Results.Ok(filteredProjects);
            });

            //extractedDataRoutes.MapGet("/{id:int}", async (int id, IExtractedDataService service) =>
            //{
            //    var entity = await service.GetExtractedFileById(id);
            //    return entity is not null ? Results.Ok(entity) : Results.NotFound();
            //});


             //===== Saved Jobs Endpoints =====
            //extractedDataRoutes.MapPost("/save", async ([FromBody] SaveJobPostModel request, HttpContext context, DataContext db) =>
            //{
            //    var userId = int.Parse(context.User.FindFirst("sub")!.Value);

            //    var saved = new SavedJob
            //    {
            //        JobId = request.JobId,
            //        UserId = userId,
            //        SavedAt = DateTime.UtcNow
            //    };

            //    db.SavedJobs.Add(saved);
            //    await db.SaveChangesAsync();
            //    return Results.Ok();
            //}).RequireAuthorization();

            //extractedDataRoutes.MapDelete("/save/{jobId:int}", async (int jobId, HttpContext context, DataContext db) =>
            //{
            //    var userId = int.Parse(context.User.FindFirst("sub")!.Value);

            //    var existing = db.SavedJobs.FirstOrDefault(s => s.UserId == userId && s.JobId == jobId);
            //    if (existing is null) return Results.NotFound();

            //    db.SavedJobs.Remove(existing);
            //    await db.SaveChangesAsync();
            //    return Results.Ok();
            //}).RequireAuthorization();

            //extractedDataRoutes.MapGet("/saved", async (HttpContext context, DataContext db) =>
            //{
            //    var userId = int.Parse(context.User.FindFirst("sub")!.Value);

            //    var savedJobs = db.SavedJobs
            //        .Where(s => s.UserId == userId)
            //        .Select(s => new SavedJobResponse
            //        {
            //            Id = s.Id,
            //            JobId = s.JobId,
            //            JobTitle = s.Job.Title,
            //            SavedAt = s.SavedAt
            //        });

            //    return Results.Ok(await savedJobs.ToListAsync());
            //}).RequireAuthorization();

            //extractedDataRoutes.MapGet("/isSaved/{jobId:int}", async (int jobId, HttpContext context, DataContext db) =>
            //{
            //    var userId = int.Parse(context.User.FindFirst("sub")!.Value);
            //    var isSaved = await db.SavedJobs.AnyAsync(s => s.UserId == userId && s.JobId == jobId);
            //    return Results.Ok(isSaved);
            //}).RequireAuthorization();


        }
    }
}
