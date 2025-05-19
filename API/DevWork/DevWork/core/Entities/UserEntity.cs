using System.ComponentModel.DataAnnotations;

namespace DevWork.Core.Entities
{
    public class UserEntity
    {

        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)] 
        public string FullName { get; set; }

        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; } = "123";

        [Required]
        public UserType Role { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public enum UserType
        {
            Employer,
            Worker
        }
    }
}