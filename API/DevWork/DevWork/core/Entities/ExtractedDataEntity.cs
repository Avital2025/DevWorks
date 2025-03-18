using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevWork.Core.Entities
{
    public class ExtractedDataEntity
    {
        [Key]
        public int ProjectID { get; set; }
       
        public bool IsActive { get; set; }
        public int EmployerID { get; set; } // בעל הקובץ
        public int AIResponseId { get; set; } // תשובת ה-AI
        public string S3Key { get; set; } // ה-S3 Key של הקובץ
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [ForeignKey("EmployerID")]
        public UserEntity Employer { get; set; }

        [ForeignKey("AIResponseId")]
        public AIResponse AIResponse { get; set; }

        //[MaxLength(200)]
        //public string ProjectTitle { get; set; }
        //public string ProjectDescription { get; set; }
        //public int? RequiredExperience { get; set; }



        //public string ProgrammingLanguages { get; set; }
        //public bool RemoteWorkAvailable { get; set; }
        //public string EnglishLevel { get; set; }
        //[Required]


        //  מפתח זר- מעסיק, תאריך העלאה עדכון, מפתח לקובץ, קישור ל response
        // מפתח זר וערך ל response

    }
}
