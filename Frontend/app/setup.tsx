import { getIdentity, setName } from '@/components/identity';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { createUser } from '@/api';


export default function SetupScreen() {
  const [value, setValue] = useState('');
  const router = useRouter();
  async function save() {
    if (value.trim().length === 0) return;
    await setName(value.trim());
    await createUser(value.trim());
    router.replace('/(tabs)/addedActivities');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Enter a name for this device
      </Text>

      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20
        }}
        value={value}
        onChangeText={setValue}
      />

      <Button title="Save" onPress={save} />
    </View>
  );
}
