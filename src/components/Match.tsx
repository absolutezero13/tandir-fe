import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
// id: 2,
// name: 'Julia',
// age: '23',
// image: 'https://randomuser.me/api/portraits/',
export interface IMatch {
  id: number;
  name: string;
  age: string;
  image: string;
  messages: string[];
}

export interface MatchProps {
  match: IMatch;
  onPress: (event: GestureResponderEvent) => void;
}

const Match = ({match, onPress}: MatchProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View br100 marginR-12>
        <Image source={{uri: match.image}} style={styles.image} />
      </View>
      <View>
        <Text marginB-3 accent bold xlarge>
          {match.name}{' '}
        </Text>
        <Text accent small>
          {match.messages[match.messages.length - 1]}{' '}
        </Text>
      </View>
    </Pressable>
  );
};

export default Match;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  image: {width: 80, height: 80, borderRadius: 99},
});
