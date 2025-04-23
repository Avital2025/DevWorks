namespace DevWork.API.Models
{
    public class UserUpdateCredentialsModel
    {
        public string FullName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
    }
}
