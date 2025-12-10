using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Endpoints;

public static class ActivityEndpoints
{
    public static void MapActivities(this WebApplication app)
    {
        // GET all
        app.MapGet("/activities", async (AppDbContext db) =>
        {
            var now = DateTime.UtcNow; 
            var upcomingActivities = await db.Activities
                .Where(a => a.Date >= now)
                .ToListAsync();

            return upcomingActivities;
        });
        // GET by id
        app.MapGet("/activities/{id:int}", async (int id, AppDbContext db) =>
            await db.Activities.FindAsync(id) is Activity activity
                ? Results.Ok(activity)
                : Results.NotFound());

        // POST
        app.MapPost("/activities", async (Activity activity, AppDbContext db) =>
        {
            // Ensure the user exists
            var userExists = await db.Users.AnyAsync(u => u.UserId == activity.CreatedByUserId);
            if (!userExists)
                return Results.BadRequest($"User {activity.CreatedByUserId} does not exist");

            // Only the FK is needed; do not attach CreatedByUser from client
            db.Activities.Add(activity);
            await db.SaveChangesAsync();

            return Results.Created($"/activities/{activity.ActivityId}", activity);
        });


        // PUT
        app.MapPut("/activities/{id:int}", async (int id, Activity updated, AppDbContext db) =>
        {
            var activity = await db.Activities.FindAsync(id);
            if (activity is null) return Results.NotFound();

            activity.Title = updated.Title;
            activity.Description = updated.Description;
            activity.Latitude = updated.Latitude;
            activity.Longitude = updated.Longitude;
            activity.Date = updated.Date;
            activity.Category = updated.Category;

            await db.SaveChangesAsync();
            return Results.Ok(activity);
        });

        // DELETE
        app.MapDelete("/activities/{id:int}", async (int id, AppDbContext db) =>
        {
            var activity = await db.Activities.FindAsync(id);
            if (activity is null) return Results.NotFound();

            db.Activities.Remove(activity);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        //Get activities by user
        app.MapGet("/users/{userId:int}/activities", async (int userId, AppDbContext db) =>
        {
            var activities = await db.Activities
                .Where(a => a.CreatedByUserId == userId)
                .ToListAsync();

            return Results.Ok(activities);
        });


        //Cancel activity //TODO authentication
        app.MapPost("/activities/{id:int}/cancel/{userId:int}", async (int id, int userId, AppDbContext db) =>
        {
            var activity = await db.Activities.FindAsync(id);
            if (activity == null) return Results.NotFound();

            if (activity.CreatedByUserId != userId)
                return Results.BadRequest("Only the creator can cancel this activity.");

            activity.IsCanceled = true;
            activity.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync();
            return Results.Ok(activity);
        });


        //Join activity
        app.MapPost("/activities/{id:int}/join/{userId:int}", async (int id, int userId, AppDbContext db) =>
        {
            var activity = await db.Activities
                .Include(a => a.Participants)
                .FirstOrDefaultAsync(a => a.ActivityId == id);

            if (activity == null) return Results.NotFound();
            if (activity.IsCanceled) return Results.BadRequest();
            if (activity.Participants.Any(p => p.UserId == userId)) return Results.BadRequest();
            if (activity.Participants.Count >= activity.MaxParticipants) return Results.BadRequest();

            var user = await db.Users.FindAsync(userId);
            if (user == null) return Results.NotFound();

            activity.Participants.Add(user);
            activity.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync();
            return Results.Ok(activity);
        });

        //Leave activity
        app.MapPost("/activities/{id:int}/leave/{userId:int}", async (int id, int userId, AppDbContext db) =>
        {
            var activity = await db.Activities
                .Include(a => a.Participants)
                .FirstOrDefaultAsync(a => a.ActivityId == id);

            if (activity == null) return Results.NotFound();

            var user = activity.Participants.FirstOrDefault(p => p.UserId == userId);
            if (user == null) return Results.BadRequest();

            activity.Participants.Remove(user);
            activity.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync();
            return Results.Ok(activity);
        });


        //activities near a location
        app.MapGet("/activities/near", async (double lat, double lng, double radius, AppDbContext db) =>
        {
            var activities = await db.Activities
                .Where(a => !a.IsCanceled)
                .ToListAsync();

            double ToRad(double v) => v * Math.PI / 180;

            var result = activities.Where(a =>
            {
                var R = 6371.0;
                var dLat = ToRad(a.Latitude - lat);
                var dLon = ToRad(a.Longitude - lng);

                var h =
                    Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                    Math.Cos(ToRad(lat)) *
                    Math.Cos(ToRad(a.Latitude)) *
                    Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

                var distance = 2 * R * Math.Asin(Math.Sqrt(h));
                return distance <= radius;
            });

            return Results.Ok(result);
        });

        //activities on a specific date
        app.MapGet("/activities/on", async (DateTime date, AppDbContext db) =>
        {
            return await db.Activities
                .Where(a => a.Date.Date == date.Date && !a.IsCanceled)
                .Include(a => a.Participants)
                .ToListAsync();
        });
    }
}
