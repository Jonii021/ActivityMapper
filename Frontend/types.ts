import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Activity type
export interface Activity {
  id?: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}


export type RootStackParamList = {
  Setup: undefined;
  Tabs: undefined; 
  Modal: undefined;
};
