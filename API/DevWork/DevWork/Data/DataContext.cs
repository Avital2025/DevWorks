using DevWork.core.Entities;
using DevWork.Core.Dto;
using DevWork.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace DevWork.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { 

        }
        public DbSet<ExtractedDataEntity> extractedDataList { get; set; }
        public DbSet<UserEntity> usersList { get; set; }
     public DbSet<FilesDto> filesListDto { get; set; }
        public DbSet<FilesEntity> filesList { get; set; }

        public DbSet<Reminder> Reminders { get; set; }

        //public DbSet<SavedJob> SavedJobs { get; set; }



    }
}


