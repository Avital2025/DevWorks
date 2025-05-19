using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevWork.Core.Entities
{
    public class ExtractedDataEntity
    {
        [Key]
        public int ProjectID { get; set; }
       
        public bool IsActive { get; set; }
        public int EmployerID { get; set; } 
        public String EmployerEmail { get; set; } 
        public int AIResponseId { get; set; } 
        public string S3Key { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [ForeignKey("EmployerID")]
        public UserEntity Employer { get; set; }

        public string? Title { get; set; }
        public string? DisplayName { get; set; }
        public string? Description { get; set; }
        public int? Experience { get; set; }
        public string? WorkPlace { get; set; }
        public string? Languages { get; set; }
        public bool? RemoteWork { get; set; }
        public string? EnglishLevel { get; set; }





    }
}
