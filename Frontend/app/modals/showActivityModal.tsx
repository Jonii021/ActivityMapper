import React from 'react';
import { Modal, View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Activity } from '../../constants/types';
import { useTranslation } from 'react-i18next';

type Props = {
  visible: boolean;
  activity: Activity;
  onClose: () => void;
};

export default function ShowActivityModal({ visible, activity, onClose }: Props) {
  const { t } = useTranslation();

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
