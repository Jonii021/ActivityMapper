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
    }
}
