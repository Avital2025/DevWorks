using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevWork.Core.Entities
{
    public class FilesEntity
    {
        public int Id { get; set; }

        public string FileName { get; set; }

        public string DisplayName { get; set; }

        public string FileType { get; set; }
        public long Size { get; set; } = 0;

        public string S3Key { get; set; } = "";

        public int? FolderId { get; set; } 

        public string EmployerEmail { get; set; }

        public int EmployerID { get; set; } = 0;

        [ForeignKey("EmployerID")]
        public UserEntity employer { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; } 

           public bool IsDeleted { get; set; } 
    }
}
