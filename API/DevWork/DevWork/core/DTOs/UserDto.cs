using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using static DevWork.Core.Entities.UserEntity;

namespace DevWork.Core.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
            public string FullName { get; set; }

            public string Email { get; set; }

            public UserType Type { get; set; }

            public DateTime CreatedAt { get; set; }

            public DateTime UpdatedAt { get; set; }

        }
}