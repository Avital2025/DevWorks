using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevWork.Core.Dto
{
    public class FilesDto
    {
        public string FileUrl { get; set; }

        public string FileName { get; set; }

        public string FileType { get; set; }// סוג הקובץ (pdf, jpg וכו')

        public long Size { get; set; } // גודל הקובץ בבתים

        public DateTime CreatedAt { get; set; } // תאריך העלאה

        public DateTime UpdatedAt { get; set; } // תאריך עדכון אחרון

    //    public bool IsDeleted { get; set; } // דגל למחיקה רכה
    }
}
