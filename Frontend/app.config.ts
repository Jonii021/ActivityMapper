import 'dotenv/config';
import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
    name: "myApp",
    slug: "myApp",
    extra: {
        API_URL: process.env.API_URL!, // non-null assertion
    },
};

export default config;