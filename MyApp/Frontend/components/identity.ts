import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const ID_KEY = 'local_id';
const NAME_KEY = 'local_name';

export interface Identity {
  id: string;
  name: string | null;
}

export async function getIdentity(): Promise<Identity> {
  let id = await AsyncStorage.getItem(ID_KEY);
  let name = await AsyncStorage.getItem(NAME_KEY);

  if (!id) {
    id = uuidv4();
    await AsyncStorage.setItem(ID_KEY, id);
  }

  return { id, name };
}

export async function setName(value: string): Promise<void> {
  await AsyncStorage.setItem(NAME_KEY, value);
}
