using DevWork.core.DTOs;
using DevWork.core.Entities;

namespace DevWork.core.Services
{
    public interface IReminderService
    {
        Task<Reminder> CreateAsync(ReminderCreateDto dto);
        Task SetAsDoneAsync(int id);
        Task<List<Reminder>> GetShownAsync(int userId); 
        Task<List<Reminder>> GetDueNowAsync();
    }
}
