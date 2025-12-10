namespace backend.Models;


public class Activity
{
    public int ActivityId { get; set; }

    public double Latitude { get; set; }
    public double Longitude { get; set; }

    public string Title { get; set; } = "";
    public string Description { get; set; } = "";

    public DateTime Date { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    public string Category { get; set; } = "";
    public string LocationName { get; set; } = "";

    public bool IsCanceled { get; set; } = false;
    public int? MaxParticipants { get; set; } = null;

    public int CreatedByUserId { get; set; }
    public User CreatedByUser { get; set; }

    public List<User> Participants { get; set; } = new();
}
