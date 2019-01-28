// @flow

import React, { PureComponent } from 'react';
import {
 StyleSheet, View, Alert, Button 
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import axios from 'axios';
import { Formik } from 'formik';
import { compose } from 'recompose';
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from 'react-native-formik';
import { TextField } from 'react-native-material-textfield';
import * as Yup from 'yup';

const styles = StyleSheet.create({
  flex: { padding: 20 }
});

const FormikInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextField);
const InputsContainer = withNextInputAutoFocusForm(View);

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(5, 'Min 5 charactest'),
  phone: Yup.string()
    .required()
    .min(5, 'Min 5 charactest')
});

class AddScreen extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  onAddPeople = (name, phone) => {
    axios
      .post('http://private-36f1e-contactstest.apiary-mock.com/contacts', {
        name,
        phone
      })
      .then((response) => {
        Navigation.pop(this.props.componentId);
      })
      .catch((error) => {
        Alert.alert('Something went wrong!');
      });
  };

  render() {
    return (
      <View style={styles.flex}>
        <Formik
          onSubmit={(values) => {
            this.onAddPeople(values.name, values.phone);
          }}
          validationSchema={validationSchema}
        >
          {(props) => {
            return (
              <InputsContainer>
                <FormikInput
                  label="First and Last Name"
                  name="name"
                  type="name"
                />
                <FormikInput label="Phone" name="phone" type="phone" />
                <Button onPress={props.handleSubmit} title="Add" />
              </InputsContainer>
            );
          }}
        </Formik>
      </View>
    );
  }
}

export default AddScreen;
