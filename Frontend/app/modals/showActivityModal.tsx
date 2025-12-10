import React, { act, useEffect } from 'react';
import { Modal, View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Activity } from '../../constants/types';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@ant-design/react-native';
import { postJoinActivity } from '@/api';

type Props = {
  visible: boolean;
  activity: Activity;
  onClose: () => void;
};

export default function ShowActivityModal({ visible, activity, onClose }: Props) {
  const { t } = useTranslation();

  const [joined, setJoined] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<number>(0);

  //console.log('ShowActivityModal rendered with activity:', activity);
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('Local_ID');
      if (id) {
        setUserId(parseInt(id, 10));
      } else {
        console.warn('LOCAL_ID not found in AsyncStorage');
        setUserId(null); // or handle as needed
      }
    };
    fetchUserId();
  }, []);

  async function JoinActivity(activityId: number) {
    //console.log(activity);
    if (!userId) {
      console.warn('Cannot join activity, userId is invalid');
      return;
    }

    try {
      await postJoinActivity(activityId, userId);
      setJoined(true);
    } catch (error) {
      console.error(`Failed to join activity ${activityId} for user ${userId}:`, error);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>

        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>

            <View style={styles.modalContent}>
              <Text>{t('category')}: {activity?.category}</Text>
              <Text>{t('Title')}: {activity?.title}</Text>
              <Text>{t('Description')}: {activity?.description}</Text>
              <Text>{t('selectDate')}: {activity?.date ? (
                new Date(activity.date).toLocaleString())
                : ''
              }</Text>
              <Button onPress={() => { JoinActivity(activity.activityId) }} >
                {t('joinActivity')}
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>

    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    padding: 4,
  },
});
