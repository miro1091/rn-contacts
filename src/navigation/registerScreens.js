// @flow

import React from 'react';
import { Navigation } from 'react-native-navigation';

import { ContactsScreen, DetailScreen, AddScreen } from 'AppScreens';
import { Provider } from 'AppRedux';

import { CONTACTS_SCREEN, DETAIL_SCREEN, ADD_SCREEN } from './Screens';

function WrappedComponent(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider>
        <Component {...props} />
      </Provider>
    );

    return <EnhancedComponent />;
  };
}

export default function () {
  Navigation.registerComponent(CONTACTS_SCREEN, () => WrappedComponent(ContactsScreen));
  Navigation.registerComponent(DETAIL_SCREEN, () => WrappedComponent(DetailScreen));
  Navigation.registerComponent(ADD_SCREEN, () => WrappedComponent(AddScreen));
}
