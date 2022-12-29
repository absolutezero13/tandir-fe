import {wipeUnreadMessages} from 'api/conversation';
import {socket} from 'controllers/socketController';
import React, {useEffect, useState} from 'react';
import {GestureResponderEvent, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors, Text, View} from 'react-native-ui-lib';
import {IUser} from 'services/types/auth';
import {Conversation} from 'services/types/conversation';
import {useAuth} from 'store';

export interface MatchProps {
  match: IUser;
  onPress: (event: GestureResponderEvent) => void;
  matchId: string;
  conversation: Conversation;
  user: IUser;
}

const Match = ({match, onPress, matchId, conversation, user}: MatchProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View br100 marginR-12>
        <FastImage source={{uri: match.pictures[0]}} style={styles.image} />
      </View>
      <View row centerV spread>
        <Text marginB-3 accent bold xlarge>
          {match.username}{' '}
        </Text>
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
