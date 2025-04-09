using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevWork.Core.Entities
{
    public class FilesEntity
    {
        public int Id { get; set; }

        public string FileName { get; set; }

        public string FileType { get; set; }// סוג הקובץ (pdf, jpg וכו')

        public long Size { get; set; } = 0;// גודל הקובץ בבתים

        public string S3Key { get; set; } = ""; // מזהה הקובץ ב-S3 (לדוגמה: 'uploads/user1/file.jpg')

        public int? FolderId { get; set; } // תיקיית היעד (null אם לא משויך לתיקיה)

        public int EmployerID { get; set; } = 0;// בעל הקובץ

        [ForeignKey("EmployerID")]
        public UserEntity employer { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } // תאריך העלאה

        public DateTime UpdatedAt { get; set; } // תאריך עדכון אחרון

           public bool IsDeleted { get; set; } // דגל למחיקה רכה
    }
}
