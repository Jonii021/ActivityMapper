import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Activity } from '../../types';

type Props = {
  visible: boolean;
  activity?: Partial<Activity>;
  onSave: (activity: Partial<Activity>) => void;
  onClose: () => void;
};

export default function AddActivityModal({ visible, activity, onSave, onClose }: Props) {
  const [title, setTitle] = useState(activity?.title || '');
  const [description, setDescription] = useState(activity?.description || '');

  useEffect(() => {
    setTitle(activity?.title || '');
    setDescription(activity?.description || '');
  }, [activity]);

  const handleSave = () => {
    onSave({ ...activity, title, description });
  };

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
          <Text>Title:</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} />
          <Text>Description:</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={onClose} />
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
