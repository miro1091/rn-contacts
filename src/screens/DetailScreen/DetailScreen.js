// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
 StyleSheet, View, Alert, Text, FlatList 
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  userItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  userInfo: {
    backgroundColor: '#ededed',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    padding: 10
  },
  userItems: {
    padding: 10
  },
  userPhone: {
    fontWeight: 'bold'
  },
  userPhoneNumber: {
    marginTop: 5
  },
  userItemCount: {
    paddingRight: 20
  }
});

class DetailScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://private-36f1e-contactstest.apiary-mock.com/contacts/${
          this.props.id
        }/order`
      )
      .then(res => this.setState({ items: res.data.items }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View>
        <View style={styles.userInfo}>
          <Text style={styles.userPhone}>Phone</Text>
          <Text style={styles.userPhoneNumber}>{this.props.phone}</Text>
        </View>
        <View style={styles.userItems}>
          <FlatList
            data={this.state.items}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Text>{item.name}</Text>
                <Text style={styles.userItemCount}>{`${item.count}x`}</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

DetailScreen.propTypes = {
  getFacebookUserData: PropTypes.func,
  screenType: PropTypes.oneOf(['Single', 'Tab'])
};

export default DetailScreen;
