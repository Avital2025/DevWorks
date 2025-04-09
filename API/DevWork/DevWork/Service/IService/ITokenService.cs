using DevWork.Core.Dto;

namespace DevWork.Service.IService
{
    public interface ITokenService
    {
        string CreateToken(UserDto user, IConfiguration configuration);
    }

}
