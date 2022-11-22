import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {WithFocus} from '@components';
import {useCustomNavigation} from '@hooks';
import {authApi} from '@api';
import {IUser} from '../../services/types/auth';
import {useAuth} from '@store';
import {format} from 'date-fns';

const Profile = () => {
  const user = useAuth().user as IUser;
  const {navigate} = useCustomNavigation();
  const {userImages, setUserImages} = useAuth();

  const [editing, setEditing] = useState(false);

  const onFocus = async () => {
    const images = await authApi.getImages(user._id as string);
    setUserImages(images);
  };

  return (
    <WithFocus onFocus={onFocus}>
      <View flex-1 backgroundColor={Colors.secondary} paddingH-24>
        {userImages[0] && (
          <View centerH marginT-24>
            <Image source={{uri: userImages[0].imageUrl}} style={styles.image} />
            <Pressable style={styles.myPhotos} onPress={() => navigate('UpdatingPhotos', {updating: true})}>
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
            value={user.birthDate.split('T')[0].split('-').slice().reverse().join('-')}
          />
          <TextInput
            editable={editing}
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
