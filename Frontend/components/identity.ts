import AsyncStorage from '@react-native-async-storage/async-storage';

const ID_KEY = 'local_id';
const NAME_KEY = 'local_name';

export interface Identity {
  id: string;
  name: string | null;
}

export async function getIdentity() {
  const storedUserId = await AsyncStorage.getItem(ID_KEY);
  const storedName = await AsyncStorage.getItem(NAME_KEY);

  if (storedUserId) {
    return { id: Number(storedUserId), name: storedName };
  }

  return { id: null, name: null };
}

export async function setName(value: string): Promise<void> {
  await AsyncStorage.setItem(NAME_KEY, value);
}
