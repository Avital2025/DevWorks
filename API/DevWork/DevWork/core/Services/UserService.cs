using AutoMapper;
using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.Core.Entities;
using DevWork.Data;
using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public UserService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<UserDto>> GetAllUsers()
    {
        var users = await _context.usersList.ToListAsync();
        return _mapper.Map<IEnumerable<UserDto>>(users);
    }

    public async Task<UserDto?> GetUserById(int userId)
    {
        var user = await _context.usersList.FindAsync(userId);
        return user is not null ? _mapper.Map<UserDto>(user) : null;
    }

    public async Task<UserDto> AddUser(UserPostModel userPostModel)
    {
        var userEntity = _mapper.Map<UserEntity>(userPostModel);
        _context.usersList.Add(userEntity);
        await _context.SaveChangesAsync();

        return _mapper.Map<UserDto>(userEntity);
    }


    public async Task<UserDto> Authenticate(string email, string password)
    {
        var userEntity = await _context.usersList.FirstOrDefaultAsync(u => u.Email == email);

        if (userEntity == null || !BCrypt.Net.BCrypt.Verify(password, userEntity.PasswordHash))
        {
            return null;
        }

        var userDto = new UserDto
        {
            Id = userEntity.Id,
            FullName = userEntity.FullName,
            Email = userEntity.Email,
            Type = userEntity.Role,
            CreatedAt = userEntity.CreatedAt,
            UpdatedAt = userEntity.UpdatedAt
        };

        return userDto;
    }


    public async Task<UserEntity?> GetUserByEmail(string email)
    {
        return await _context.usersList.FirstOrDefaultAsync(u => u.Email == email);
    }


    public async Task<bool> UpdateCredentialsAsync(int userId, UserUpdateCredentialsModel model)
    {
        var user = await _context.usersList.FindAsync(userId);
        if (user == null) return false;

        user.FullName = model.FullName;
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.PasswordHash);
        user.UpdatedAt = DateTime.UtcNow;


        await _context.SaveChangesAsync();
        return true;
    }



}
