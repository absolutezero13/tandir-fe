import React, {useEffect, useState} from 'react';
import {GestureResponderEvent, Pressable, StyleSheet} from 'react-native';

// elements
import FastImage from 'react-native-fast-image';
import {Colors, Text, View} from 'react-native-ui-lib';

import {ImageResponse, IUser} from 'services/types/auth';
import {Conversation} from 'services/types/conversation';
import {getImages} from 'api/auth';

export interface MatchProps {
  match: IUser;
  onPress: (image: ImageResponse) => void;
  matchId: string;
  conversation: Conversation;
  user: IUser;
}

const Match = ({match, onPress, matchId, conversation, user}: MatchProps) => {
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    getImages(match?._id).then(res => setUserImage(res[0]));
  }, []);

  return (
    <Pressable onPress={() => onPress(userImage)} style={styles.container}>
      <View br100 marginR-12>
        {userImage && <FastImage source={{uri: userImage?.imageUrl}} style={styles.image} />}
      </View>
      <View row centerV spread width={'70%'}>
        <View>
          <Text marginB-3 accent bold xlarge>
            {match.username}{' '}
          </Text>
          <Text accent bold small>
            {conversation.messages[conversation.messages.length - 1]?.message.substring(0, 10)}...
          </Text>
        </View>
        {conversation.unread[user._id as string].length > 0 && (
          <View marginL-5 backgroundColor={Colors.primary} padding-5 height={40} width={40} center br100>
            <Text accent large bold>
              {conversation.unread[user._id as string].length}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default Match;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  image: {width: 80, height: 80, borderRadius: 99},
});
