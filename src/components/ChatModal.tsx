import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, Modal, Platform, Pressable, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {useKeyboard} from '@hooks';
import {mockMessages} from '../utils/help';
import Input from './Input';

interface ModalProps {
  setChatModalData: Function;
  chatModalData: any;
}

interface MockMessage {
  order: number;
  text: string;
  isSelf: boolean;
}

interface IUserMessage {
  img: string;
  message: MockMessage;
  isSelf: boolean;
}

const UserMessage = ({img, message, isSelf}: IUserMessage) => {
  const alignSelf = isSelf ? 'flex-end' : 'flex-start';
  return (
    <View row style={{alignSelf}} center marginT-12>
      {!isSelf && <FastImage source={{uri: img}} style={styles.userImage} />}
      <View padding-16 row br100 center backgroundColor={isSelf ? Colors.primary : 'white'}>
        <Text color={isSelf ? Colors.accent : Colors.secondary} medium>
          {message.text}{' '}
        </Text>
      </View>
    </View>
  );
};

const ChatModal = ({setChatModalData, chatModalData}: ModalProps) => {
  const {top} = useSafeAreaInsets();
  const {keyboardHeight} = useKeyboard();
  const flatRef = useRef<FlatList>(null);

  const [messageText, setMessageText] = useState('');

  const backAction = useCallback(() => {
    setChatModalData(null);
    return true;
  }, [setChatModalData]);

  useEffect(() => {
    if (chatModalData) {
      console.log('use effecT!');

      setTimeout(() => {
        flatRef.current?.scrollToEnd();
      }, 100);
    }
  }, [keyboardHeight, chatModalData]);

  useEffect(() => {
    const backEvent = BackHandler.addEventListener('hardwareBackPress', backAction);
    return backEvent.remove;
  }, [backAction]);

  const RenderItem = ({item}: {item: MockMessage}) => {
    return <UserMessage img={chatModalData.img} message={item} isSelf={item.isSelf} />;
  };
  return (
    <Modal animationType="slide" visible={!!chatModalData}>
      <View useSafeArea backgroundColor={Colors.secondary} flex-1>
        <Text center xlarge accent>
          {chatModalData?.username}{' '}
        </Text>
        <Pressable hitSlop={30} onPress={() => setChatModalData(null)} style={[styles.cross, {top: top - 4}]}>
          <Icon name="close" color={Colors.accent} size={30} />
        </Pressable>

        <View marginT-24 flex-1>
          <FlatList
            ref={flatRef}
            data={mockMessages}
            style={styles.flat}
            keyExtractor={item => item.order.toString()}
            renderItem={RenderItem}
            contentContainerStyle={styles.flatPadding}
          />
        </View>
        <View
          style={[
            styles.inputWrapper,
            {marginBottom: (Platform.select({ios: keyboardHeight, android: 0}) as number) + 6},
          ]}
        >
          <Input fontSize={16} placeholder="Bir mesaj yaz..." value={messageText} onChangeText={setMessageText} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flat: {flex: 1},
  cross: {position: 'absolute', right: 16},
  flatPadding: {paddingHorizontal: 20, paddingBottom: 40},
  inputWrapper: {marginTop: 'auto', marginHorizontal: 20},
  userImage: {width: 30, height: 30, borderRadius: 99, marginRight: 12},
});

export default ChatModal;
