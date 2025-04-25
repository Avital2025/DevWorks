using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.Core.Entities;

public interface IFilesService
{
    //Task<string?> GetDownloadUrl(int fileId);
    Task<IEnumerable<FilesDto>> GetAllFiles();
    Task<FilesDto?> GetFileById(int fileId);
    //Task<FilesDto> AddFile(FilesPostModel file);
    Task<FilesDto?> UpdateFile(FilesPostModel file);
    //Task<bool> DeleteFile(int fileId);

    Task<IEnumerable<FilesDto>> GetUserFilesAsync(string userId);

    Task<bool> CheckIfFileExistsAsync(string fileName, int employerId);
    Task<ExtractedDataEntity> ProcessFile(string fileUrl, int employerId, string projectName);

    Task<bool> DeleteFileAsync(int fileId);
    Task<bool> RenameFileAsync(int fileId, string newFileName);
}
