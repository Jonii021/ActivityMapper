import { StyleSheet, Alert } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { Text, View } from '@/components/Themed';
import React, { useEffect, useState } from 'react';
import { getActivities, createActivity } from '../../api';
import { Activity } from '../../constants/types';
import AddActivityModal from '../modals/addActivityModal';
import ShowActivityModal from '../modals/showActivityModal';
import FontAwesome from '@expo/vector-icons/FontAwesome';


function ActivityIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function AddActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [showModalVisible, setShowModalVisible] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({});
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
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
    setAddModalVisible(true);
  };

  const handleSave = async (activity: Partial<Activity>) => {
    if (activity.title && activity.description && activity.latitude && activity.longitude) {
      await createActivity(activity as Activity);
      setAddModalVisible(false);
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
            onPress={() => {
              setShowModalVisible(true);
              setSelectedActivity(activity);
            }} coordinate={{
              latitude: activity.latitude,
              longitude: activity.longitude
            }}   >
            <View
              style={{
                backgroundColor: '#ffffff',

              }}

            >
              <ActivityIcon
                name="trophy"
                color="orange"
              />
            </View>
          </Marker>
        ))}

      </MapView>

      <ShowActivityModal
        visible={showModalVisible}
        activity={selectedActivity as Activity}
        onClose={() => setShowModalVisible(false)}
      />
      <AddActivityModal
        visible={addModalVisible}
        activity={newActivity}
        onSave={handleSave}
        onClose={() => setAddModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
})


