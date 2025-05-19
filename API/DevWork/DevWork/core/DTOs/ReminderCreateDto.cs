namespace DevWork.core.DTOs
{
    public class ReminderCreateDto
    {
        public int UserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Content { get; set; } 
        public string TriggerType { get; set; } = "time";
        public int? TriggerTargetId { get; set; }
        public DateTime? Time { get; set; }
    }

}
