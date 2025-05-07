using System;


namespace DevWork.core.Entities
{
    public class Reminder
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; } = string.Empty;

        public string? Content { get; set; } // ← חדש

        public string TriggerType { get; set; } = "time"; // "time", "download", "save"
        public int? TriggerTargetId { get; set; } // למשל מזהה משרה
        public DateTime? Time { get; set; } // רלוונטי רק ל-type 'time'
        public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
