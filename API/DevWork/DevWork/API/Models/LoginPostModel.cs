namespace DevWork.API.Models
{
    public class LoginPostModel
    {
        public string email { get; set; }

        public string passwordHash { get; set; }
    }
}
