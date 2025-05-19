
using DevWork.Core.Entities;

namespace DevWork.API.Models
{
    public class FilesPostModel
    {
        public int? Id { get; set; }
        public string FileName { get; set; }

        public string FileType { get; set; }


        public int EmployerID { get; set; } = 0;// בעל הקובץ

    }
}