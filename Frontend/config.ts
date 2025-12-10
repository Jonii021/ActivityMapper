import Constants from 'expo-constants';

type Extra = {
    API_URL: string;
};

// Force TypeScript to treat as non-null
const extra = Constants.expoConfig!.extra as Extra;

export const API_URL = extra.API_URL;