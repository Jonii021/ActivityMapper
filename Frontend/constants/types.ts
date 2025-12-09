
// Activity type
export interface Activity {
  ActivityId?: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  date: string;
  category: string;
  createdByUserId: number;
  createdByUsername?: string;
}

export interface User {
  userId?: number;
  username: string;
}