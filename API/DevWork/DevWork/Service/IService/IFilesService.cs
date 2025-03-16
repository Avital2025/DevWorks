using DevWork.API.Models;
using DevWork.Core.Dto;

public interface IFilesService
{
    Task<IEnumerable<FilesDto>> GetAllFiles();
    Task<FilesDto?> GetFileById(int fileId);
    Task<FilesDto> AddFile(FilesPostModel file);
    Task<FilesDto?> UpdateFile(FilesPostModel file);
    Task<bool> DeleteFile(int fileId);
}
