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

        // מחזיר את ה-DTO, שכולל את ה-id, fullName ו-email
        return _mapper.Map<UserDto>(userEntity);
    }

    /*
     * public async Task<User> AddUser(UserPostModel model)
    {
        var user = new User
        {
            Email = model.Email,
            PasswordHash = model.PasswordHash,
            FullName = model.FullName
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }
     * */

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
    public async Task<UserDto> Authenticate(string email, string password)
    {
        var userEntity = await _context.usersList.FirstOrDefaultAsync(u => u.Email == email);

        if (userEntity == null || !BCrypt.Net.BCrypt.Verify(password, userEntity.PasswordHash))
        {
            return null;
        }

        // המרה מ-UserEntity ל-UserDto
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

    //public async Task<UserEntity> Authenticate(string email, string password)
    //{
    //    // חפש את המשתמש לפי המייל
    //    var user = await _context.usersList
    //        .FirstOrDefaultAsync(u => u.Email == email);

    //    if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash)) // השווה את הסיסמה ל-Hash
    //    {
    //        return null; // לא נמצא משתמש עם המייל הזה או שהסיסמה לא נכונה
    //    }
    //    return user; // הלוגין הצליח
    //}


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

        await _context.SaveChangesAsync();
        return true;
    }



}
