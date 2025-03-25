using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.Core.Entities;

public interface IFilesService
{
    //Task<string?> GetDownloadUrl(int fileId);
    Task<IEnumerable<FilesDto>> GetAllFiles();
    Task<FilesDto?> GetFileById(int fileId);
    Task<FilesDto> AddFile(FilesPostModel file);
    Task<FilesDto?> UpdateFile(FilesPostModel file);
    //Task<bool> DeleteFile(int fileId);

    Task<ExtractedDataEntity> ProcessFile(string fileUrl, int employerId);
}
