using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevWork.Core.Dto
{
    public class ExtractedDataDto
    {

        public string ProjectTitle { get; set; }
        public string ProjectDescription { get; set; }
        public int? RequiredExperience { get; set; }

        //public bool IsActive { get; set; }


        public UserDto employer { get; set; }

        public string WorkPlace { get; set; }
        public string ProgrammingLanguages { get; set; }
        public string RemoteWorkAvailable { get; set; }
        public string EnglishLevel { get; set; }

       public DateTime CreatedAt { get; set; }
       public DateTime UpdatedAt { get; set; }
    }
}
