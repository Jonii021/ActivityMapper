import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Activity } from '../../constants/types';

type Props = {
  visible: boolean;
  activity: Activity;
  onClose: () => void;
};

export default function ShowActivityModal({ visible, activity, onClose }: Props) {

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
              <Text>Category: {activity?.category}</Text>
              <Text>Title: {activity?.title}</Text>
              <Text>Description: {activity?.description}</Text>
              <Text>  Date: {activity?.date ? (
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
