using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Endpoints;

public static class UserEndpoints
{
    public static void User(this WebApplication app)
    {
        // GET all
        app.MapGet("/users", async (AppDbContext db) =>
            await db.Users.ToListAsync());

        // GET by id
        app.MapGet("/users/{id:int}", async (int id, AppDbContext db) =>
            await db.Users.FindAsync(id) is User user
                ? Results.Ok(user)
                : Results.NotFound());

        // POST
        app.MapPost("/users", async (User user, AppDbContext db) =>
        {
            db.Users.Add(user);
            await db.SaveChangesAsync();
            return Results.Created($"/users/{user.UserId}", user);
        });

        // PUT
        app.MapPut("/users/{id:int}", async (int id, User updated, AppDbContext db) =>
        {
            var user = await db.Users.FindAsync(id);
            if (user is null) return Results.NotFound();

            user.Username = updated.Username;

            await db.SaveChangesAsync();
            return Results.Ok(user);
        });

        // DELETE
        app.MapDelete("/users/{id:int}", async (int id, AppDbContext db) =>
        {
            var user = await db.Users.FindAsync(id);
            if (user is null) return Results.NotFound();

            db.Users.Remove(user);
            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}
