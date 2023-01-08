import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors, Text, View} from 'react-native-ui-lib';
import {ImageResponse, IUser} from 'services/types/auth';
import {Message} from 'services/types/conversation';

interface IUserMessage {
  img: ImageResponse;
  message: Message;
  isLast: boolean;
  user: IUser;
}

const UserMessage = ({img, message, isLast, user}: IUserMessage) => {
  const isSelf = message.from === user._id;
  const alignSelf = message.from === user._id ? 'flex-end' : 'flex-start';

  return (
    <View row style={{alignSelf}} center marginB-40={isLast}>
      {!isSelf && <FastImage source={{uri: img.imageUrl}} style={styles.userImage} />}
      <View padding-16 row br30 center backgroundColor={isSelf ? Colors.primary : 'white'}>
        <Text color={isSelf ? Colors.accent : Colors.secondary} medium>
          {message.message}{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default UserMessage;
