import { StyleSheet, Alert } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { Text, View } from '@/components/Themed';
import React, { useEffect, useState } from 'react';
import { getActivities, createActivity } from '../../api';
import { Activity } from '../../types';
import ActivityModal from '../modals/addActivityModal';


export default function TabOneScreen() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await getActivities();
      setActivities(data ?? []);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to load activities');
    } finally {
      setLoading(false);
    }
  };



  const handleMapPress = (e: MapPressEvent) => {
    setNewActivity({
      title: '',
      description: '',
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
    setModalVisible(true);
  };

  const handleSave = async (activity: Partial<Activity>) => {
    if (activity.title && activity.description && activity.latitude && activity.longitude) {
      await createActivity(activity as Activity);
      setModalVisible(false);
      setNewActivity({});
      loadActivities();
    }
  };
  
useEffect(() => {
  loadActivities();
}, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 61.4978,
          longitude: 23.7610,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={handleMapPress}
      >
        {activities.map((activity) => (
          <Marker
            key={activity.id}
            coordinate={{ latitude: activity.latitude, longitude: activity.longitude }}
            title={activity.title}
            description={activity.description}
          />
        ))}
      </MapView>

      <ActivityModal
        visible={modalVisible}
        activity={newActivity}
        onSave={handleSave}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
})


