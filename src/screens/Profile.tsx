import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import WithFocus from '../components/WithFocus';

import {useServices} from '../services';
import {IUser} from '../services/types/auth';
import {useAuth} from '../zustand';

const Profile = () => {
  const user = useAuth().user as IUser;
  const {getImages} = useServices().api.authApi;
  const {userImages, setUserImages} = useAuth();

  const onFocus = async () => {
    const images = await getImages(user._id as string);
    setUserImages(images);
  };

  return (
    <WithFocus onFocus={onFocus}>
      <View flex-1 backgroundColor={Colors.secondary} paddingH-24>
        {userImages[0] && (
          <View centerH marginT-24>
            <Image source={{uri: userImages[0]}} style={styles.image} />
            <Pressable style={styles.myPhotos}>
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
            placeholder="Email"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={user.email}
          />
          <TextInput
            editable={false}
            placeholder="Birth Date"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={user.birthDate as string}
          />
          <TextInput
            editable={false}
            placeholder="Place"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={user.city + ', ' + user.county}
          />
        </View>
      </View>
    </WithFocus>
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
    marginTop: 24,
  },

  myPhotos: {
    marginTop: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Profile;
