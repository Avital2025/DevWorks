using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.Core.Entities;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetAllUsers();
    Task<UserDto?> GetUserById(int userId);
    Task<UserDto> AddUser(UserPostModel user);
    Task<UserDto?> UpdateUser(UserPostModel user);

        Task<UserDto> Authenticate(string email, string passwordHash);
        Task<UserEntity?> GetUserByEmail(string email);
        //Task<UserEntity> AddUser(UserPostModel model);
    


}
