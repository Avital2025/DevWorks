using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.Core.Entities;

public interface IExtractedDataService
{
    Task<IEnumerable<ExtractedDataDto>> GetAllExtractedFiles();
    Task<ExtractedDataDto?> GetExtractedFileById(int projectId);
    Task<List<ExtractedDataEntity>> GetFilteredProjects( int? experience, string workPlace, string languages, bool? remoteWork, string englishLevel);


    Task<ExtractedDataDto> Add(ExtractedDataPostModel dto);

    //   Task<ExtractedDataDto?> Update(ExtractedDataPostModel dto);

    // Task<bool> Delete(int projectId);
}
