
// Activity type
export interface Activity {
  activityId?: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  date: string;
  category: string;
  createdByUserId: number;
  createdByUsername?: string;
  locationName?: string;
  maxParticipants?: number;
  participants?: User[];
  isCancelled?: boolean;
}

export interface User {
  userId?: number;
  username: string;
  createdActivities?: Activity[];
  participatingActivities?: Activity[];
  sentFriendRequests?: FriendRequest[];
  receivedFriendRequests?: FriendRequest[];
  friends?: User[];
}

export interface FriendRequest {
  friendRequestId?: number;
  fromUserId: number;
  toUserId: number;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  toUser?: User;
  fromUser?: User;
  createdAt?: string;
  respondedAt?: string;
}