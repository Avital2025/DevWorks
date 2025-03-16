using AutoMapper;
using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.Core.Entities;
using DevWork.Data;
using Microsoft.EntityFrameworkCore;

public class ExtractedDataService : IExtractedDataService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public ExtractedDataService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    //public async Task<IEnumerable<ExtractedDataDto>> GetAllExtractedFiles()
    //{
    //    var extractedData = await _context._extractedDataList.ToListAsync();
    //    return _mapper.Map<IEnumerable<ExtractedDataDto>>(extractedData);
    //}

    public async Task<ExtractedDataDto?> GetExtractedFileById(int projectId)
    {
        var entity = await _context.extractedDataList.FindAsync(projectId);
        return entity is not null ? _mapper.Map<ExtractedDataDto>(entity) : null;
    }

    public async Task<List<ExtractedDataEntity>> GetFilteredProjects(AIResponse filterParams)
    {
        var query = _context.extractedDataList.Where(p => p.IsActive); // רק קבצים פעילים

        // ✅ אם אין פרמטרים בכלל - מחזירים את כל הקבצים הפעילים
        if (string.IsNullOrWhiteSpace(filterParams.Title) &&
            string.IsNullOrWhiteSpace(filterParams.Description) &&
            !filterParams.Experience.HasValue &&
            string.IsNullOrWhiteSpace(filterParams.Languages) &&
            !filterParams.RemoteWork.HasValue &&
            string.IsNullOrWhiteSpace(filterParams.EnglishLevel))
        {
            return await query.ToListAsync();
        }

        // סינון לפי הפרמטרים שנשלחו
        if (!string.IsNullOrWhiteSpace(filterParams.Title))
            query = query.Where(p => p.ProjectTitle.Contains(filterParams.Title));

        if (!string.IsNullOrWhiteSpace(filterParams.Description))
            query = query.Where(p => p.ProjectDescription.Contains(filterParams.Description));

        if (filterParams.Experience.HasValue)
            query = query.Where(p => p.RequiredExperience >= filterParams.Experience.Value);

        if (filterParams.RemoteWork.HasValue)
            query = query.Where(p => p.RemoteWorkAvailable == filterParams.RemoteWork.Value);

        if (!string.IsNullOrWhiteSpace(filterParams.EnglishLevel))
        {
            var allowedLevels = new HashSet<string> { "high", "low", "standard" };
            if (allowedLevels.Contains(filterParams.EnglishLevel.ToLower()))
            {
                query = query.Where(p => p.EnglishLevel == filterParams.EnglishLevel);
            }
        }

        // ✅ טיפול בשפות - בדיקה אם לפחות אחת מהשפות קיימת (ללא כפילויות)
        if (!string.IsNullOrWhiteSpace(filterParams.Languages))
        {
            var languagesArray = filterParams.Languages.Split(',')
                .Select(l => l.Trim().ToLower())
                .Distinct()
                .ToList();

            query = query.Where(p => languagesArray.Any(lang => p.ProgrammingLanguages.ToLower().Contains(lang)));
        }

        return await query.ToListAsync();
    }

    public async Task<ExtractedDataDto> Add(ExtractedDataPostModel dto)
    {
        var entity = _mapper.Map<ExtractedDataEntity>(dto);
        entity.CreatedAt = DateTime.Now;
        entity.UpdatedAt = DateTime.Now;
        _context.extractedDataList.Add(entity);
        await _context.SaveChangesAsync();
        return _mapper.Map<ExtractedDataDto>(entity);
    }

    public Task<IEnumerable<ExtractedDataDto>> GetAllExtractedFiles()
    {
        throw new NotImplementedException();
    }


    //public async Task<ExtractedDataDto?> Update(ExtractedDataPostModel ext)
    //{
    //    var existingEntity = await _context.extractedDataList.FindAsync(ext.Id);
    //    if (existingEntity is null) return null;

    //    _mapper.Map(ext, existingEntity);
    //    await _context.SaveChangesAsync();

    //    return _mapper.Map<ExtractedDataPostModel>(existingEntity);
    //}

    //public async Task<bool> Delete(int projectId)
    //{
    //    var entity = await _context.extractedDataList.FindAsync(projectId);
    //    if (entity is null) return false;

    //    _context.extractedDataList.Remove(entity);
    //    await _context.SaveChangesAsync();
    //    return true;
    //}
}


