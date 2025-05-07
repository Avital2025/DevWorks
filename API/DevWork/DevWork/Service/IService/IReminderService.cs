using DevWork.core.DTOs;
using DevWork.core.Entities;

namespace DevWork.core.Services
{
    public interface IReminderService
    {
        Task<Reminder> CreateAsync(ReminderCreateDto dto);
        Task<List<Reminder>> GetPendingByTriggerAsync(string triggerType, int triggerTargetId);
        Task SetAsDoneAsync(int id);
        Task<List<Reminder>> GetShownAsync();
        Task<List<Reminder>> GetDueNowAsync();
    }
}
