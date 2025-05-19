using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.Core.Entities;

public interface IExtractedDataService
{
    Task<List<ExtractedDataDto>> GetFilteredProjects(
   int? experience,
   string workPlace,
   string languages,
   bool? remoteWork,
   string englishLevel);

    Task<ExtractedDataDto> Add(ExtractedDataPostModel dto);


}
