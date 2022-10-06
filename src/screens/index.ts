import {ModalScreenLayouts, ScreenLayouts, TabScreenLayouts} from '../services/navigation/types';
import {genRootNavigator, genStackNavigator, genTabNavigator} from '../services/navigation/help';
import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Profile from './Profile';
import Matches from './Matches';
import Example from './Example';
import {TandirHeader} from '../services/navigation/headers';
import RegisterPhotos from './RegisterPhotos';

// Describe your screens here
export type Tabs = 'Main' | 'Profile' | 'Matches';
export type Modal = 'ExampleModal';
export type Screen = 'Example' | 'Settings' | 'Splash' | 'Login' | 'Register' | 'Tabs' | 'RegisterPhotos';

export type ModalProps = {
  ExampleModal: undefined;
};
export type ScreenProps = {
  Main: undefined;
  Settings: undefined;
  Splash: undefined;
  Login: undefined;
  Register: undefined;
} & ModalProps;

// Screens
const screens: ScreenLayouts = {
  Example: {
    name: 'Example',
    component: Example,
    options: () => ({
      title: 'Example',
    }),
  },

  Splash: {
    name: 'Splash',
    component: Splash,
    options: () => ({
      headerShown: false,
    }),
  },
  Login: {
    name: 'Login',
    component: Login,
    options: () => ({
      headerShown: false,
    }),
  },
  Register: {
    name: 'Register',
    component: Register,
    options: () => ({
      headerTitle: 'Kayıt',
      headerBackTitle: 'Geri',
    }),
  },
  RegisterPhotos: {
    name: 'RegisterPhotos',
    component: RegisterPhotos,
    options: () => ({
      headerTitle: 'Kayıt',
      headerBackTitle: 'Geri',
    }),
  },
};

const ExampleModalStack = () => genStackNavigator([screens.Example]);

// Tabs
const tabs: TabScreenLayouts = {
  Profile: {
    name: 'Profile',
    component: Profile,
    options: () => TandirHeader({title: 'Profil'}),
  },
  Main: {
    name: 'Main',
    component: Main,
    options: () => TandirHeader({title: 'Lahmaç'}),
  },
  Matches: {
    name: 'Matches',
    component: Matches,
    options: () => TandirHeader({title: 'Eşleşmeler'}),
  },
};
const TabNavigator = () => genTabNavigator([tabs.Profile, tabs.Main, tabs.Matches]);
const AppNavigator = () =>
  genStackNavigator([
    screens.Splash,
    screens.Login,
    screens.Register,
    screens.RegisterPhotos,
    {
      name: 'Tabs',
      component: TabNavigator,
      options: () => ({
        headerShown: false,
      }),
    },
  ]);

// Modals
const modals: ModalScreenLayouts = {
  ExampleModal: {
    name: 'ExampleModal',
    component: ExampleModalStack,
    options: () => ({
      title: 'ExampleModal',
    }),
  },
};

// Root Navigator
export const RootNavigator = (): JSX.Element => genRootNavigator(AppNavigator, [modals.ExampleModal]);
