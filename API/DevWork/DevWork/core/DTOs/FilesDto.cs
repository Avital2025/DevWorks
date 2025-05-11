using DevWork.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevWork.Core.Dto
{
    public class FilesDto
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileUrl { get; set; }
        public string FileType { get; set; }
        public long Size { get; set; }
        public DateTime CreatedAt { get; set; }
        public int EmployerId { get; set; }  

    }

}
