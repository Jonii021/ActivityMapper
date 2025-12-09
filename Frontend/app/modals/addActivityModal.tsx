import { Modal, View, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Activity } from '../../constants/types';
import { DatePicker, Form, Input, List, Picker, Provider } from '@ant-design/react-native'
import enUS from '@ant-design/react-native/lib/locale-provider/en_US';


type Props = {
  visible: boolean;
  activity?: Partial<Activity>;
  onSave: (activity: Partial<Activity>) => void;
  onClose: () => void;
};

export default function AddActivityModal({ visible, activity, onSave, onClose }: Props) {
  const [form] = Form.useForm();

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
      category: Array.isArray(formValues.category) ? formValues.category[0] : formValues.category,
    };
    const updatedActivity: Activity = { ...activity, ...normalizedValues };
    onSave(updatedActivity);
    form.resetFields();
  };

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
                placeholder="Title"
                style={styles.input}
              />
            </Form.Item>

            <Form.Item
              name="description">
              <Input
                placeholder="Description"
                style={styles.input}
              />
            </Form.Item>
            <Form.Item
              key={'category'}
              name="category">
              <Picker
                data={pickerData}
              >
                <List.Item arrow="horizontal">Category</List.Item>
              </Picker>
            </Form.Item>

            <Form.Item
              name="date">
              <DatePicker
                precision="hour"
                minDate={new Date()}
                format="DD-MM-YYYY"
              >
                <List.Item arrow="horizontal">Select Date</List.Item>
              </DatePicker>
            </Form.Item>
          </Form>

          <View style={{ marginTop: 12 }}>
            <Button
              title="Save"
              onPress={() => {
                form.validateFields().then(values => handleSave()); {
                }
              }
              }
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <Button title="Cancel" onPress={onClose} />
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
