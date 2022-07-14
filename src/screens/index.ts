import {ModalScreenLayouts, ScreenLayouts, TabScreenLayouts} from '../services/navigation/types';

import {Settings} from './settings';
import {Example} from './screen-sample';
import {genRootNavigator, genStackNavigator, genTabNavigator} from '../services/navigation/help';
import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Profile from './Profile';
import Matches from './Matches';

// Describe your screens here
export type Tabs = 'Main' | 'Profile' | 'Matches';
export type Modal = 'ExampleModal';
export type Screen = 'Example' | 'Settings' | 'Splash' | 'Login' | 'Register' | 'Tabs';

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
  Settings: {
    name: 'Settings',
    component: Settings,
    options: () => ({
      title: 'Settings',
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
};

const ExampleModalStack = () => genStackNavigator([screens.Example]);

// Tabs
const tabs: TabScreenLayouts = {
  Profile: {
    name: 'Profile',
    component: Profile,
    options: () => ({
      title: 'Profil',
    }),
  },
  Main: {
    name: 'Main',
    component: Main,
    options: () => ({
      title: 'Lahmaç',
    }),
  },
  Matches: {
    name: 'Matches',
    component: Matches,
    options: () => ({
      title: 'Eşleşmeler',
    }),
  },
};
const TabNavigator = () => genTabNavigator([tabs.Profile, tabs.Main, tabs.Matches]);
const AppNavigator = () =>
  genStackNavigator([
    screens.Splash,
    screens.Login,
    screens.Register,
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
