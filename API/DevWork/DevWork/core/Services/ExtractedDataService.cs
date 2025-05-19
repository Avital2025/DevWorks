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



    public async Task<List<ExtractedDataDto>> GetFilteredProjects(
        int? experience,
        string workPlace,
        string languages,
        bool? remoteWork,
        string englishLevel)
    {
        var query = _context.extractedDataList
            .Include(e => e.Employer)
            .Where(p => p.IsActive);

        if (experience.HasValue)
            query = query.Where(p => p.Experience <= experience.Value);

        if (!string.IsNullOrWhiteSpace(workPlace))
            query = query.Where(p => p.WorkPlace.ToLower().Contains(workPlace.ToLower()));

        if (remoteWork.HasValue)
            query = query.Where(p => p.RemoteWork == remoteWork.Value);

        if (!string.IsNullOrWhiteSpace(englishLevel))
        {
            var allowedLevels = new HashSet<string> { "high", "low", "standard" };
            if (allowedLevels.Contains(englishLevel.ToLower()))
                query = query.Where(p => p.EnglishLevel == englishLevel);
        }

        if (!string.IsNullOrWhiteSpace(languages))
        {
            var languagesArray = languages.Split(',')
                .Select(l => l.Trim().ToLower())
                .Distinct()
                .ToList();

            query = query.Where(p => languagesArray.Any(lang => p.Languages.ToLower().Contains(lang)));
        }

        return await query
            .Select(p => new ExtractedDataDto
            {
                Title = p.Title,
                DisplayName = p.DisplayName,
                Description = p.Description,
                EmployerEmail = p.Employer.Email,
                EmployerID = p.Employer.Id,
                EnglishLevel = p.EnglishLevel,
                Experience = p.Experience,
                Languages = p.Languages,
                RemoteWork = p.RemoteWork,
                WorkPlace = p.WorkPlace
            })
            .ToListAsync();

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

}


