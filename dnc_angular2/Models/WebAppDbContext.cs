using Microsoft.EntityFrameworkCore;

namespace DncAngular2.Models
{
    public class WebAppDbContext : DbContext {
        public DbSet<Church> Churches { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=DNC-Angular2.db;Trusted_Connection=True;MultipleActiveResultSets=true");
        }
    }
}
