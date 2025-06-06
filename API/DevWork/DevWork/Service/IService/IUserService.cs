﻿using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.Core.Entities;

public interface IUserService
{
    Task<IEnumerable<UserDto>> GetAllUsers();
    Task<UserDto?> GetUserById(int userId);
    Task<UserDto> AddUser(UserPostModel user);

        Task<UserDto> Authenticate(string email, string passwordHash);
        Task<UserEntity?> GetUserByEmail(string email);

    Task<bool> UpdateCredentialsAsync(int userId, UserUpdateCredentialsModel model);





}
