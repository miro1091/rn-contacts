import { Navigation } from 'react-native-navigation';
import { pushContactsScreen } from './src/navigation';

Navigation.events().registerAppLaunchedListener(() => pushContactsScreen());
