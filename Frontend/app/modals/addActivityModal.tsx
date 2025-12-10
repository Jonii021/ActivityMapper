import { Modal, View, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Activity } from '../../constants/types';
import { DatePicker, Form, Input, List, Picker, Provider } from '@ant-design/react-native'
import enUS from '@ant-design/react-native/lib/locale-provider/en_US';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

type Props = {
  userId?: number;
  visible: boolean;
  activity?: Partial<Activity>;
  onSave: (activity: Partial<Activity>) => void;
  onClose: () => void;
};

export default function AddActivityModal({ visible, activity, onSave, onClose }: Props) {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [userId, setUserId] = useState<number | undefined>();


  useEffect(() => {
    AsyncStorage.getItem('Local_ID').then(id => {
      if (id)
        setUserId(parseInt(id, 10));
    });
  }, []);


  const pickerData = [

    { label: 'Other', value: 'Other', key: 'other' },
    { label: 'Football', value: 'Football', key: 'soccer' },
    { label: 'Baseball', value: 'Baseball', key: 'baseball' },
    { label: 'Basketball', value: 'Basketball', key: 'basketball' },
    { label: 'Volleyball', value: 'Volleyball', key: 'volleyball' },
    { label: 'Fitness', value: 'Fitness', key: 'fitness' },
    { label: 'Running', value: 'Running', key: 'running' },
    { label: 'Walking', value: 'Walking', key: 'walking' },
    { label: 'Biking', value: 'Biking', key: 'biking' },
    { label: 'Hiking', value: 'Hiking', key: 'hiking' },
  ];

  const handleSave = () => {
    const formValues = form.getFieldsValue();
    // Ensure category is a string, not an array
    const normalizedValues = {
      ...formValues,
      createdByUserId: userId,
      category: Array.isArray(formValues.category) ? formValues.category[0] : formValues.category,
    };
    const updatedActivity: Activity = { ...activity, ...normalizedValues };
    //console.log('Saving activity:', updatedActivity);
    onSave(updatedActivity);
    form.resetFields();
  };

  //console.log('Rendering AddActivityModal with activity:', activity);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        form.resetFields();
        onClose();
      }}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer} />
      </TouchableWithoutFeedback>

      <Provider locale={enUS}>
        <View style={styles.modalContent}>

          <Form form={form}

            initialValues={{
              title: '',
              description: '',
              date: new Date(),
              category: '',
            }}>
            <Form.Item
              name="title">
              <Input
                placeholder={t('Title')}
                style={styles.input}
              />
            </Form.Item>

            <Form.Item
              name="description">
              <Input
                placeholder={t('Description')}
                style={styles.input}
              />
            </Form.Item>
            <Form.Item
              key={'category'}
              name="category">
              <Picker
                data={pickerData}
              >
                <List.Item arrow="horizontal">{t('category')}</List.Item>
              </Picker>
            </Form.Item>

            <Form.Item
              name="date">
              <DatePicker
                precision="hour"
                minDate={new Date()}
                format="DD-MM-YYYY"
              >
                <List.Item arrow="horizontal">{t('selectDate')}</List.Item>
              </DatePicker>
            </Form.Item>
          </Form>

          <View style={{ marginTop: 12 }}>
            <Button
              title={t('save')}
              onPress={() => {
                form.validateFields().then(values => handleSave()); {
                }
              }
              }
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <Button title={t('cancel')} onPress={onClose} />
          </View>
        </View>
      </Provider>
    </Modal >
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    padding: 4,
  },
});
