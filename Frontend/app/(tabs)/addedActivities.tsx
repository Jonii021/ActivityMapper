import { Alert, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Activity } from '@/constants/types';
import { useEffect, useState } from 'react';
import { getAddedActivities } from '@/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowActivityModal from '../modals/showActivityModal';

export default function TabTwoScreen() {
  const [addedActivities, setAddedActivities] = useState<Activity[]>([]);
  const [showModalVisible, setShowModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const loadAddedActivities = async () => {
    try {
      const data = await getAddedActivities(parseInt(await AsyncStorage.getItem('LOCAL_ID') || '0'));
      setAddedActivities(data ?? []);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to load activities');
    }
  };

  useEffect(() => {
    loadAddedActivities();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.AddedActivitiesContainer}>
        <Text style={styles.title}>Added Activities</Text>
        {addedActivities.map((activity) => (
          <Pressable key={activity.ActivityId}
            onPress={() => {
              setShowModalVisible(true);
              setSelectedActivity(activity);
            }}>
            <Text>{activity.title}</Text>
          </Pressable>
        ))}
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <ShowActivityModal
        visible={showModalVisible}
        activity={selectedActivity as Activity}
        onClose={() => setShowModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  AddedActivitiesContainer: {
  }
});
