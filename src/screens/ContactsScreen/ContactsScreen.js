// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import { DETAIL_SCREEN, ADD_SCREEN } from 'AppNavigator';
import { connect } from 'react-redux';
import { fetchPeopleAsync } from '../../redux/modules/data/actionCreators';

const styles = StyleSheet.create({
  flex: {
    padding: 10
  },
  contactItem: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingBottom: 7
  },
  contactImage: { width: 50, height: 50 },
  contactInfo: { paddingLeft: 5, paddingTop: 3 }
});

class ContactsScreen extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'nav_add_btn') {
      this.onAddPeople();
    }
  }

  onAddPeople = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: ADD_SCREEN,
        options: {
          topBar: {
            title: {
              text: 'Add New Contact'
            }
          }
        }
      }
    });
  };

  handleGetStartAction = (id, name, phone) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: DETAIL_SCREEN,
        passProps: {
          id,
          name,
          phone
        },
        options: {
          topBar: {
            title: {
              text: name
            }
          }
        }
      }
    });
  };

  componentDidMount() {
    this.props.fetchPeople();
  }

  render() {
    return (
      <View style={styles.flex}>
        <FlatList
          data={this.props.fetchedPeople}
          renderItem={({ item }) => {
            console.log('item image:', item.pictureUrl);
            let image = (
              <Image
                style={styles.contactImage}
                source={require('img/icons/icons8-user-male-90.png')}
              />
            );

            if (item.pictureUrl) {
              image = (
                <Image
                  source={{
                    uri: item.pictureUrl
                  }}
                  style={styles.contactImage}
                />
              );
            }

            return (
              <TouchableOpacity
                onPress={() => this.handleGetStartAction(item.id, item.name, item.phone)
                }
                key={item.id}
                style={styles.contactItem}
              >
                <View>{image}</View>
                <View style={styles.contactInfo}>
                  <Text>{item.name}</Text>
                  <Text>{item.phone}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchedPeople: state.data.fetchPeople
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPeople: () => dispatch(fetchPeopleAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsScreen);
