using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.Core.Entities;

public interface IFilesService
{
    Task<FilesDto?> GetFileById(int fileId);
    Task<FilesDto?> UpdateFile(FilesPostModel file);

    Task<IEnumerable<FilesDto>> GetUserFilesAsync(string userId);

    Task<bool> CheckIfFileExistsAsync(string fileName, int employerId);
    Task<ExtractedDataEntity> ProcessFile(string fileUrl, int employerId, string projectName);

    Task<bool> DeleteFileAsync(int fileId);
    Task<bool> RenameFileAsync(int fileId, string newFileName);
}
