namespace backend.Models;


public class Activity
{
    public int ActivityId { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public DateTime Date { get; set; }
    public string Category { get; set; } = "";

    public int CreatedByUserId { get; set; }
    public User CreatedByUser { get; set; }
}
