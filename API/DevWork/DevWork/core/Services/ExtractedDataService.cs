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

    //public async Task<List<ExtractedDataEntity>> GetFilteredProjects(string title, string description, int? experience, string workPlace, string languages, bool? remoteWork, string englishLevel)
    //{
    //    var query = _context.extractedDataList
    //    .Include(e => e.AIResponse) // לוודא שמושכים גם את הנתונים מה-AI
    //    .Include(e => e.Employer) // לוודא שמושכים גם את הנתונים של המעסיק
    //    .Where(p => p.IsActive); // רק קבצים פעילים

    //    // סינון על פי פרמטרים של AIResponse
    //    if (!string.IsNullOrWhiteSpace(title))
    //        query = query.Where(p => p.AIResponse.Title.Contains(title));

    //    if (!string.IsNullOrWhiteSpace(description))
    //        query = query.Where(p => p.AIResponse.Description.Contains(description));

    //    if (experience.HasValue)
    //        query = query.Where(p => p.AIResponse.Experience >= experience.Value);

    //    if (remoteWork.HasValue)
    //        query = query.Where(p => p.AIResponse.RemoteWork == remoteWork.Value);

    //    if (!string.IsNullOrWhiteSpace(englishLevel))
    //    {
    //        var allowedLevels = new HashSet<string> { "high", "low", "standard" };
    //        if (allowedLevels.Contains(englishLevel.ToLower()))
    //        {
    //            query = query.Where(p => p.AIResponse.EnglishLevel == englishLevel);
    //        }
    //    }

    //    // סינון על פי שפות
    //    if (!string.IsNullOrWhiteSpace(languages))
    //    {
    //        var languagesArray = languages.Split(',')
    //            .Select(l => l.Trim().ToLower())
    //            .Distinct()
    //            .ToList();

    //        query = query.Where(p => languagesArray.Any(lang => p.AIResponse.Languages.ToLower().Contains(lang)));
    //    }


    //    // כאן אפשר להוסיף סינון על מקום עבודה אם יש צורך
    //    //if (!string.IsNullOrWhiteSpace(workPlace))
    //    //    query = query.Where(p => p.AIResponse.WorkPlace.Contains(workPlace));

    //    // החזרת התוצאות לאחר הסינון
    //    return await query.ToListAsync();
    //}


    public async Task<List<ExtractedDataEntity>> GetFilteredProjects(
       
      int? experience,
      string workPlace,
      string languages,
      bool? remoteWork,
      string englishLevel)
    {
        Console.WriteLine("ggggggggg");
        var query = _context.extractedDataList
            .Include(e => e.Employer) // לוודא שמושכים גם את הנתונים של המעסיק
            .Where(p => p.IsActive); // רק קבצים פעילים

        // סינון על פי ניסיון
        if (experience.HasValue)
            query = query.Where(p => p.Experience >= experience.Value);

        // סינון לפי מקום עבודה
        if (!string.IsNullOrWhiteSpace(workPlace))
            query = query.Where(p => p.WorkPlace.ToLower().Contains(workPlace.ToLower()));

        // סינון על פי עבודה מרחוק
        if (remoteWork.HasValue)
            query = query.Where(p => p.RemoteWork == remoteWork.Value);

        // סינון על פי רמת אנגלית
        if (!string.IsNullOrWhiteSpace(englishLevel))
        {
            var allowedLevels = new HashSet<string> { "high", "low", "standard" };
            if (allowedLevels.Contains(englishLevel.ToLower()))
            {
                query = query.Where(p => p.EnglishLevel == englishLevel);
            }
        }

        // סינון על פי שפות
        if (!string.IsNullOrWhiteSpace(languages))
        {
            var languagesArray = languages.Split(',')
                .Select(l => l.Trim().ToLower())
                .Distinct()
                .ToList();

            query = query.Where(p => languagesArray.Any(lang => p.Languages.ToLower().Contains(lang)));
        }

        // החזרת התוצאות לאחר הסינון
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


