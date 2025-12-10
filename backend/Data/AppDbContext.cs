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
            .WithMany(u => u.CreatedActivities) 
            .HasForeignKey(a => a.CreatedByUserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Activity>()
            .HasMany(a => a.Participants)
            .WithMany(u => u.JoinedActivities)
            .UsingEntity<Dictionary<string, object>>(
                "UserActivity",
                ua => ua.HasOne<User>().WithMany().HasForeignKey("UserId").OnDelete(DeleteBehavior.Cascade),
                ua => ua.HasOne<Activity>().WithMany().HasForeignKey("ActivityId").OnDelete(DeleteBehavior.Cascade)
            );

        modelBuilder.Entity<FriendRequest>()
            .HasOne(fr => fr.FromUser)
            .WithMany(u => u.SentFriendRequests)
            .HasForeignKey(fr => fr.FromUserId)
            .OnDelete(DeleteBehavior.Restrict);

    }
    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<User> Users => Set<User>();
    public DbSet<FriendRequest> FriendRequests => Set<FriendRequest>();

}

