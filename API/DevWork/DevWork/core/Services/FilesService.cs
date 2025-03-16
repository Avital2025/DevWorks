using AutoMapper;
using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.Core.Entities;
using DevWork.Data;
using Microsoft.EntityFrameworkCore;

public class FilesService : IFilesService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public FilesService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<FilesDto>> GetAllFiles()
    {
        var files = await _context.filesList.ToListAsync();
        return _mapper.Map<IEnumerable<FilesDto>>(files);
    }

    public async Task<FilesDto?> GetFileById(int fileId)
    {
        var file = await _context.filesList.FindAsync(fileId);
        return file is not null ? _mapper.Map<FilesDto>(file) : null;
    }

    public async Task<FilesDto> AddFile(FilesPostModel filePostModel)
    {
        var fileEntity = _mapper.Map<FilesEntity>(filePostModel);
        _context.filesList.Add(fileEntity);
        await _context.SaveChangesAsync();
        return _mapper.Map<FilesDto>(fileEntity);
    }

    public async Task<FilesDto?> UpdateFile(FilesPostModel filePostModel)
    {
        var existingFile = await _context.filesList.FindAsync(filePostModel.Id);
        if (existingFile is null) return null;

        _mapper.Map(filePostModel, existingFile);
        await _context.SaveChangesAsync();

        return _mapper.Map<FilesDto>(existingFile);
    }

    public async Task<bool> DeleteFile(int fileId)
    {
        var file = await _context.filesList.FindAsync(fileId);
        if (file is null) return false;

        _context.filesList.Remove(file);
        await _context.SaveChangesAsync();
        return true;
    }
}
