using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Endpoints;

public static class FriendEndpoints
{
    public static void Friends(this WebApplication app)
    {
        app.MapPost("/friends/request", async (int fromUserId, int toUserId, AppDbContext db) =>
    {
            if (fromUserId == toUserId)
                return Results.BadRequest("Cannot add yourself.");

            var existing = await db.FriendRequests
                .FirstOrDefaultAsync(fr =>
                    fr.FromUserId == fromUserId &&
                    fr.ToUserId == toUserId &&
                    fr.Status == FriendRequestStatus.Pending);

            if (existing != null)
                return Results.BadRequest("Friend request already sent.");

            var request = new FriendRequest
            {
                FromUserId = fromUserId,
                ToUserId = toUserId
            };

            db.FriendRequests.Add(request);
            await db.SaveChangesAsync();

            return Results.Ok(request);
        });

        app.MapPost("/friends/accept/{requestId}", async (int requestId, AppDbContext db) =>
        {
            var request = await db.FriendRequests.FindAsync(requestId);
            if (request == null)
                return Results.NotFound();

            request.Status = FriendRequestStatus.Accepted;
            request.RespondedAt = DateTime.UtcNow;

            await db.SaveChangesAsync();
            return Results.Ok(request);
        });

        app.MapPost("/friends/reject/{requestId}", async (int requestId, AppDbContext db) =>
        {
            var request = await db.FriendRequests.FindAsync(requestId);
            if (request == null)
                return Results.NotFound();

            request.Status = FriendRequestStatus.Rejected;
            request.RespondedAt = DateTime.UtcNow;

            await db.SaveChangesAsync();
            return Results.Ok(request);
        });

        app.MapGet("/friends/{userId}", async (int userId, AppDbContext db) =>
        {
            var friends = await db.FriendRequests
                .Where(fr =>
                    (fr.FromUserId == userId || fr.ToUserId == userId) &&
                    fr.Status == FriendRequestStatus.Accepted)
                .Select(fr => fr.FromUserId == userId ? fr.ToUser : fr.FromUser)
                .ToListAsync();

            return Results.Ok(friends);
        });

        app.MapPost("/friends/remove", async (int userId, int friendId, AppDbContext db) =>
        {
            var relation = await db.FriendRequests
                .FirstOrDefaultAsync(fr =>
                    ((fr.FromUserId == userId && fr.ToUserId == friendId) ||
                    (fr.FromUserId == friendId && fr.ToUserId == userId)) &&
                    fr.Status == FriendRequestStatus.Accepted);

            if (relation == null)
                return Results.NotFound();

            db.FriendRequests.Remove(relation);
            await db.SaveChangesAsync();

            return Results.Ok();
        });
    }
}