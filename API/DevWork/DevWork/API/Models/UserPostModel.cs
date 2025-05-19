
using static DevWork.Core.Entities.UserEntity;

namespace DevWork.API.Models
{
    public class UserPostModel
    {
        public int? Id { get; set; }
        public string FullName { get; set; }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public UserType Type { get; set; }


    }
}