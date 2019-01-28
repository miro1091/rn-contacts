// @flow

import { Navigation } from 'react-native-navigation';

import { CONTACTS_SCREEN } from './Screens';
import registerScreens from './registerScreens';

registerScreens();

export function pushContactsScreen() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: CONTACTS_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'Contacts'
                  },
                  leftButtons: [
                    {
                      id: 'nav_user_btn',
                      icon: require('img/icons/ic_nav_user.png'),
                      color: 'black'
                    }
                  ],
                  rightButtons: [
                    {
                      id: 'nav_add_btn',
                      icon: require('img/icons/icons8-plus-math-60.png'),
                      color: 'black'
                    }
                  ]
                }
              }
            }
          }
        ]
      }
    }
  });
}
