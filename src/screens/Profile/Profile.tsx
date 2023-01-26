import React, {useState} from 'react';

// elements
import {Pressable, StyleSheet} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Colors, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';

// components
import {AppButton} from '@components';

// hooks
import {useCustomNavigation} from '@hooks';

// api
import {IUser} from '../../services/types/auth';
import {useAuth} from '@store';
import {SCREEN_WIDTH} from 'utils/help';
import {storage} from 'stores/storage';
import FastImage from 'react-native-fast-image';

const Profile = () => {
  const user = useAuth().user as IUser;
  const {navigate, replace} = useCustomNavigation();
  const {userImages, clearStore} = useAuth();

  const navigateToUpdate = () => navigate('UpdatingPhotos', {updating: true});

  const navigateToPreferences = () => navigate('Preferences');

  const logout = () => {
    storage.delete('tandir-token');
    clearStore();
    replace('Login');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: Colors.secondary}}
      contentContainerStyle={styles.contentContainer}
    >
      <View flex-1 backgroundColor={Colors.secondary} paddingH-24>
        {userImages[0] && (
          <View centerH marginT-24>
            <FastImage source={{uri: userImages[0].imageUrl}} style={styles.image} />
            <Pressable style={styles.myPhotos} onPress={navigateToUpdate}>
              <Text bold accent large>
                Fotoğraflarım
              </Text>
              <Icon name="chevron-forward-outline" size={30} color={Colors.accent} />
            </Pressable>
          </View>
        )}
        <View>
          <TextInput
            editable={false}
            placeholder="Name"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={user?.username}
          />
          <TextInput
            editable={false}
            placeholder="Birth Date"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={user?.birthDate.split('T')[0].split('-').slice().reverse().join('-')}
          />
          <TextInput
            editable={false}
            placeholder="Yer"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={user?.city}
          />
        </View>
        <Pressable style={styles.myPhotos} onPress={navigateToPreferences}>
          <Text bold accent large>
            Lahmaç Tercihlerim
          </Text>
          <Icon name="chevron-forward-outline" size={30} color={Colors.accent} />
        </Pressable>
        <View marginT-40 center>
          <AppButton
            width={SCREEN_WIDTH / 1.7}
            text="Çıkış Yap"
            iconName="log-out-outline"
            iconPosition="left"
            onPress={logout}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {width: 140, height: 140, borderRadius: 999, borderWidth: 1, borderColor: Colors.accent},
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent,
    padding: 10,
    paddingVertical: 8,
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 16,
    color: Colors.accent,
    marginTop: 20,
  },
  myPhotos: {
    marginTop: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    paddingBottom: 40,
  },
});

export default Profile;
