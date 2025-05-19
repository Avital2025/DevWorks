using System;


namespace DevWork.core.Entities
{
    public class Reminder
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; } = string.Empty;

        public string? Content { get; set; }

        public string TriggerType { get; set; } = "time"; // time, save, download - for development
        public int? TriggerTargetId { get; set; }
        public DateTime? Time { get; set; } 
        public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
