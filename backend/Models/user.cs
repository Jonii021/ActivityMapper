namespace backend.Models;


public class User
{
    public int UserId { get; set; }
    public string Username { get; set; } = "";

    public List<Activity> Activities { get; set; } = new();
    
    public List<FriendRequest> SentFriendRequests { get; set; } = new();
    public List<FriendRequest> ReceivedFriendRequests { get; set; } = new();

}
