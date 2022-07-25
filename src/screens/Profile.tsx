import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors, DateTimePicker, Image, Text, View} from 'react-native-ui-lib';

const Profile = () => {
  return (
    <View flex-1 backgroundColor={Colors.secondary} paddingH-24>
      <View centerH marginT-24>
        <Image source={require('../assets/images/person1.jpeg')} style={styles.image} />
      </View>
      <View>
        <TextInput
          editable={false}
          placeholder="Name"
          placeholderTextColor={'grey'}
          style={styles.input}
          value="John"
        />
        <TextInput
          editable={false}
          placeholder="Email"
          placeholderTextColor={'grey'}
          style={styles.input}
          value="John@gmail.com"
        />
        <TextInput
          editable={false}
          placeholder="Birth Date"
          placeholderTextColor={'grey'}
          style={styles.input}
          value="01.01.1990"
        />
        <TextInput
          editable={false}
          placeholder="Place"
          placeholderTextColor={'grey'}
          style={styles.input}
          value="Kadıköy"
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
    marginHorizontal: 16,
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 16,
    color: Colors.accent,
    marginTop: 20,
  },
});

export default Profile;
