namespace backend.Data;

using Microsoft.EntityFrameworkCore;
using backend.Models;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Activity → Creator (many-to-one)
    modelBuilder.Entity<Activity>()
        .HasOne(a => a.CreatedByUser)
        .WithMany(u => u.Activities)
        .HasForeignKey(a => a.CreatedByUserId)
        .OnDelete(DeleteBehavior.Cascade);

    // Activity ↔ Participants (many-to-many)
    modelBuilder.Entity<Activity>()
        .HasMany(a => a.Participants)
        .WithMany();

    modelBuilder.Entity<FriendRequest>()
        .HasOne(fr => fr.FromUser)
        .WithMany(u => u.SentFriendRequests)
        .HasForeignKey(fr => fr.FromUserId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<FriendRequest>()
        .HasOne(fr => fr.ToUser)
        .WithMany(u => u.ReceivedFriendRequests)
        .HasForeignKey(fr => fr.ToUserId)
        .OnDelete(DeleteBehavior.Restrict);
}
    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<User> Users => Set<User>();
    public DbSet<FriendRequest> FriendRequests => Set<FriendRequest>();
}

