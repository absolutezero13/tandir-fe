import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors, Image, View} from 'react-native-ui-lib';
import {useServices} from '../services';
import {IUser} from '../services/types/auth';
import {useAuth} from '../zustand';

const Profile = () => {
  const user = useAuth().user as IUser;
  const {getImages} = useServices().api.authApi;
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    getImages(user._id).then(res => setUserImage(res[0]));
  }, []);

  console.log({user});

  return (
    <View flex-1 backgroundColor={Colors.secondary} paddingH-24>
      <View centerH marginT-24>
        <Image source={{uri: userImage}} style={styles.image} />
      </View>
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
});

export default Profile;
