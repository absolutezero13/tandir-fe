import {ModalScreenLayouts, ScreenLayouts, TabScreenLayouts} from '../services/navigation/types';
import {genRootNavigator, genStackNavigator, genTabNavigator} from '../services/navigation/help';
import Splash from './Splash/Splash';
import Login from './Login/Login';
import Register from './Register/Register';
import Main from './Main/Main';
import Profile from './Profile/Profile';
import Matches from './Matches/Matches';
import ChatModal from './ChatModal/ChatModal';
import {TandirHeader} from '../services/navigation/headers';
import UpdatingPhotos from './UpdatingPhotos/UpdatingPhotos';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import Preferences from './Preferences/Preferences';

export type Tabs = 'Main' | 'Profile' | 'Matches';
export type Modal = 'ExampleModal' | 'ChatModal';
export type Screen = 'Splash' | 'Login' | 'Register' | 'UpdatingPhotos' | 'Preferences' | 'Tabs';

export type ModalProps = {
  ExampleModal: undefined;
};
export type ScreenProps = {
  Main: undefined;
  Settings: undefined;
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  UpdatingPhotos: {updating: boolean};
  Tabs: undefined;
} & ModalProps;

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
  Preferences: {
    name: 'Preferences',
    component: Preferences,
    options: () => TandirHeader({title: 'Tercihler', showBackButton: true}) as NativeStackNavigationOptions,
  },
  Tabs: {
    name: 'Tabs',
    component: TabNavigator,
    options: () => ({
      headerShown: false,
    }),
  },
};

const ExampleModalStack = () => genStackNavigator([]);

const AppNavigator = () =>
  genStackNavigator([
    screens.Splash,
    screens.Login,
    screens.Register,
    screens.UpdatingPhotos,
    screens.Preferences,
    screens.Tabs,
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
  ChatModal: {
    name: 'ChatModal',
    component: ChatModal,
    options: () => ({
      title: 'ChatModal',
    }),
  },
};

// Root Navigator
export const RootNavigator = (): JSX.Element => genRootNavigator(AppNavigator, [modals.ChatModal]);
