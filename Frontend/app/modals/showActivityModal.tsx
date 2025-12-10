import React, { useEffect } from 'react';
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

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('LOCAL_ID');
      setUserId(parseInt(id || '0'));
    };
    fetchUserId();
  }, []);

  async function JoinActivity(ActivityId: number | undefined) {
    await postJoinActivity(ActivityId as number, userId);
    setJoined(true);
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
              <Button onPress={() => { JoinActivity(activity.ActivityId) }} >
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
