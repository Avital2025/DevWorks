using DevWork.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevWork.Core.Dto
{
    public class FilesDto
    {
        public int EmployerId { get; set; }

        public string FileUrl { get; set; }

        public string FileName { get; set; }

        public string FileType { get; set; }

        public long Size { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        [ForeignKey("EmployerId")]
        public virtual UserEntity Employer { get; set; }  // קשר לטבלת Users
    }

}
