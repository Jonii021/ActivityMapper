import axios from 'axios';
import { Activity } from './constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Replace with your backend URL (on Android emulator, use your machine IP)
const API_URL = 'http://192.168.0.30:5000/';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});


export const getActivities = async (): Promise<Activity[] | null> => {
  try {
    const response = await api.get<Activity[]>('/activities');
    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch activities:', error.message || error);
    return null; // or throw error if you want to handle it higher
  }
};

export const getActivity = async (id: number): Promise<Activity | null> => {
  try {
    const response = await api.get<Activity>(`/activities/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Failed to fetch activity ${id}:`, error.message || error);
    return null;
  }
};

export const createActivity = async (activity: Activity): Promise<Activity | null> => {
  try {
    const response = await api.post<Activity>('/activities', activity);
    return response.data;
  } catch (error: any) {
    console.error('Failed to create activity:', error.message || error);
    return null;
  }
};

export const updateActivity = async (id: number, activity: Activity): Promise<Activity | null> => {
  try {
    const response = await api.put<Activity>(`/activities/${id}`, activity);
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update activity ${id}:`, error.message || error);
    return null;
  }
};

export const deleteActivity = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/activities/${id}`);
    return true;
  } catch (error: any) {
    console.error(`Failed to delete activity ${id}:`, error.message || error);
    return false;
  }
};

export const getActivitiesByUser = async (userId: number): Promise<Activity[] | null> => {
  try {
    const response = await api.get<Activity[]>(`/users/${userId}/activities`);
    return response.data;
  } catch (error: any) {
    console.error(`Failed to fetch activities for user ${userId}:`, error.message || error);
    return null;
  }
};

export const createUser = async (username: string): Promise<{ username: string } | null> => {
  try {
    const response = await api.post<{ username: string }>('/users', { username });

    const userId = response.data.userId;
    console.log('Created user with ID:', userId);
    if (userId) {
      await AsyncStorage.setItem('Local_ID', userId.toString());
    }
    return response.data;
  } catch (error: any) {
    console.error('Failed to create user:', error.message || error);
    return null;
  }
};
export const getUser = async (userId: number): Promise<{ userId: number; username: string } | null> => {
  try {
    const response = await api.get<{ userId: number; username: string }>(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error(`Failed to fetch user ${userId}:`, error.message || error);
    return null;
  }
};