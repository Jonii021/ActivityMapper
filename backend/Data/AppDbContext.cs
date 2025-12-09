namespace backend.Data;

using Microsoft.EntityFrameworkCore;
using backend.Models;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Activity>()
            .HasOne(a => a.CreatedByUser)
            .WithMany(u => u.Activities)
            .HasForeignKey(a => a.CreatedByUserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
    
    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<User> Users => Set<User>();
}

