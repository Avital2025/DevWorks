
using DevWork.Core.Entities;

namespace DevWork.API.Models
{
    public class FilesPostModel
    {
        public int? Id { get; set; }
        public string FileName { get; set; }

        public string FileType { get; set; }// סוג הקובץ (pdf, jpg וכו')


        public int EmployerID { get; set; } = 0;// בעל הקובץ

        //    public bool IsDeleted { get; set; } // דגל למחיקה רכה
    }
}