using DevWork.Core.Dto;
using DevWork.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DevWork.API.Models
{
    public class ExtractedDataPostModel
    {
        public int ProjectID { get; set; }

        public string ProjectTitle { get; set; }
        public string ProjectDescription { get; set; }
        public int? RequiredExperience { get; set; }

        public bool IsActive { get; set; }
        public int EmployerID { get; set; }
        public UserEntity employer { get; set; }
        public string WorkPlace { get; set; }
        public string ProgrammingLanguages { get; set; }
        public string RemoteWorkAvailable { get; set; }
        public string EnglishLevel { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
