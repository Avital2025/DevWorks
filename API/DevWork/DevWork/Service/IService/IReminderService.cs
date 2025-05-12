using DevWork.core.DTOs;
using DevWork.core.Entities;

namespace DevWork.core.Services
{
    public interface IReminderService
    {
        Task<Reminder> CreateAsync(ReminderCreateDto dto);
        Task<List<Reminder>> GetPendingByTriggerAsync(string triggerType, int triggerTargetId, int userId); // הוספנו את ה-userId
        Task SetAsDoneAsync(int id);
        Task<List<Reminder>> GetShownAsync(int userId); // הוספנו את ה-userId
        Task<List<Reminder>> GetDueNowAsync();
        //Task DeleteAsync(int id);
    }
}
