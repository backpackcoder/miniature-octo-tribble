using Microsoft.EntityFrameworkCore;

namespace MvcApp.Models
{
    public class WebAppDbContext : DbContext {
        public DbSet<Church> Churches { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlite("Filename=./db.sqlite");
        }
    }
}
