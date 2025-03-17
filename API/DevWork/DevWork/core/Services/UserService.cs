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

    public async Task<UserDto?> UpdateUser(UserPostModel userPostModel)
    {
        var existingUser = await _context.usersList.FindAsync(userPostModel.Id);
        if (existingUser is null) return null;

        _mapper.Map(userPostModel, existingUser); // מעדכן את הישות עם הנתונים מה-DTO
        await _context.SaveChangesAsync();

        return _mapper.Map<UserDto>(existingUser);
    }

    public async Task<bool> DeleteUser(int id)
    {

        var user = await _context.usersList.FindAsync(id);
        if (user == null) return false;
        _context.usersList.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<UserEntity> Authenticate(string email, string passwordHash)
    {
        // חפש את המשתמש לפי המייל
        var user = await _context.usersList
            .FirstOrDefaultAsync(u => u.Email == email);

        if (user == null|| !BCrypt.Net.BCrypt.Verify(passwordHash, user.PasswordHash‏))
        {
            return null; // לא נמצא משתמש עם המייל הזה
        }
        return user; // הלוגין הצליח
    }
}
