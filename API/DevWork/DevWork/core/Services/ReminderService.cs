using AutoMapper;
using DevWork.core.DTOs;
using DevWork.core.Entities;
using DevWork.Data;
using Microsoft.EntityFrameworkCore;
using System;

namespace DevWork.core.Services
{
    public class ReminderService : IReminderService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ReminderService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Reminder> CreateAsync(ReminderCreateDto dto)
        {
            var reminder = _mapper.Map<Reminder>(dto);
            _context.Reminders.Add(reminder);
            await _context.SaveChangesAsync();
            return reminder;
        }

        public async Task<List<Reminder>> GetPendingByTriggerAsync(string triggerType, int triggerTargetId, int userId)
        {
            return await _context.Reminders
                .Where(r => r.UserId == userId && r.TriggerType == triggerType && r.TriggerTargetId == triggerTargetId && !r.IsRead)
                .ToListAsync();
        }

        public async Task SetAsDoneAsync(int id)
        {
            var reminder = await _context.Reminders.FindAsync(id);
            if (reminder != null)
            {
                reminder.IsRead = true;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Reminder>> GetShownAsync(int userId)
        {
            var now = DateTime.UtcNow;
            return await _context.Reminders
                .Where(r => r.UserId == userId && (r.IsRead || (r.Time != null && r.Time <= now)))
                .ToListAsync();
        }

        public async Task<List<Reminder>> GetDueNowAsync()
        {
            var now = DateTime.UtcNow;
            return await _context.Reminders
                .Where(r => r.Time != null && r.Time <= now && !r.IsRead)
                .ToListAsync();
        }

        //public async Task DeleteAsync(int id)
        //{
        //    var reminder = await _context.Reminders.FindAsync(id);
        //    if (reminder != null)
        //    {
        //        _context.Reminders.Remove(reminder);
        //        await _context.SaveChangesAsync();
        //    }
        //}
    }
}
