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
            await db.Activities.ToListAsync());

        // GET by id
        app.MapGet("/activities/{id:int}", async (int id, AppDbContext db) =>
            await db.Activities.FindAsync(id) is Activity activity
                ? Results.Ok(activity)
                : Results.NotFound());

        // POST
        app.MapPost("/activities", async (Activity activity, AppDbContext db) =>
        {
            db.Activities.Add(activity);
            await db.SaveChangesAsync();
            return Results.Created($"/activities/{activity.Id}", activity);
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
            activity.StartDate = updated.StartDate;
            activity.EndDate = updated.EndDate;
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
    }
}
