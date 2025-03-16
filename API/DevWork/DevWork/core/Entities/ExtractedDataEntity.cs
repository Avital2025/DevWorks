using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevWork.Core.Entities
{
    public class ExtractedDataEntity
    {
        [Key]
        public int ProjectID { get; set; }

        [MaxLength(200)]
        public string ProjectTitle { get; set; }
        public string ProjectDescription { get; set; }
        public int? RequiredExperience { get; set; }

        public bool IsActive { get; set; }
        public int EmployerID { get; set; }

        [ForeignKey("EmployerID")]
        public UserEntity employer { get; set; }

        public string ProgrammingLanguages { get; set; }
        public bool RemoteWorkAvailable { get; set; }
        public string EnglishLevel { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        //  מפתח זר- מעסיק, תאריך העלאה עדכון, מפתח לקובץ, קישור ל response
        // מפתח זר וערך ל response

    }
}
