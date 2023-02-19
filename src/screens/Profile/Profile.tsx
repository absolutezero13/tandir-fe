import React from 'react';

// elements
import {Pressable} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Colors, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';

// components
import {AppButton} from '@components';

// api
import {SCREEN_WIDTH} from 'utils/help';
import FastImage from 'react-native-fast-image';
import useProfile from './useProfile';
import styles from './styles';

const Profile = () => {
  const {userImages, user, navigateToUpdate, logout} = useProfile();

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

export default Profile;
