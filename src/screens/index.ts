import {ModalScreenLayouts, ScreenLayouts, TabScreenLayouts} from '../services/navigation/types';
import {genRootNavigator, genStackNavigator, genTabNavigator} from '../services/navigation/help';
import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Profile from './Profile';
import Matches from './Matches';
import {TandirHeader} from '../services/navigation/headers';
import UpdatingPhotos from './UpdatingPhotos';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export type Tabs = 'Main' | 'Profile' | 'Matches';
export type Modal = 'ExampleModal';
export type Screen = 'Splash' | 'Login' | 'Register' | 'UpdatingPhotos';

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
      headerBackTitle: '',
    }),
  },
  UpdatingPhotos: {
    name: 'UpdatingPhotos',
    component: UpdatingPhotos,
    options: () => TandirHeader({title: 'Güncelle', showBackButton: true}) as NativeStackNavigationOptions,
  },
};

const ExampleModalStack = () => genStackNavigator([]);

// Tabs
const tabs: TabScreenLayouts = {
  Profile: {
    name: 'Profile',
    component: Profile,
    options: () => TandirHeader({title: 'Profil'}) as BottomTabNavigationOptions,
  },
  Main: {
    name: 'Main',
    component: Main,
    options: () => TandirHeader({title: 'Lahmaç'}) as BottomTabNavigationOptions,
  },
  Matches: {
    name: 'Matches',
    component: Matches,
    options: () => TandirHeader({title: 'Eşleşmeler'}) as BottomTabNavigationOptions,
  },
};
const TabNavigator = () => genTabNavigator([tabs.Profile, tabs.Main, tabs.Matches]);
const AppNavigator = () =>
  genStackNavigator([
    screens.Splash,
    screens.Login,
    screens.Register,
    screens.UpdatingPhotos,
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
