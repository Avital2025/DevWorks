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
        public DbSet<FilesEntity> filesList { get; set; }

        public DbSet<AIResponse> AIResponses { get; set; }





    }
}


