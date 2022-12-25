import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BackHandler, Modal, Platform, Pressable, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {Colors, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {useKeyboard} from '@hooks';
import {mockMessages, SCREEN_WIDTH} from '../utils/help';
import Input from './Input';
import AppButton from './AppButton';
import {socket} from 'controllers/socketController';

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

const UserMessage = ({img, message, isSelf, isLast}: IUserMessage) => {
  const alignSelf = isSelf ? 'flex-end' : 'flex-start';
  return (
    <View row style={{alignSelf}} center marginB-40={isLast}>
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
  const [messages, setMessages] = useState(mockMessages);

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
    if (flatRef?.current) {
      setTimeout(() => {
        flatRef.current?.scrollToEnd();
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    const backEvent = BackHandler.addEventListener('hardwareBackPress', backAction);
    return backEvent.remove;
  }, [backAction]);

  useEffect(() => {
    socket.on('connect', () => console.log('CLIENT CONNECTED WITH= ' + socket.id));
    socket.emit('join-room', 'burgay');
    socket.on('receive-message', message => {
      setMessages(prev => [
        ...prev,
        {
          isSelf: false,
          order: prev.length + 1,
          text: message,
        },
      ]);
    });
  }, []);

  console.log(Platform.OS, socket.id);

  const onSendMessage = () => {
    console.log('emitting a message');
    socket.emit('message', messageText, 'burgay');
    setMessageText('');
    setMessages(prev => [
      ...prev,
      {
        isSelf: true,
        order: prev.length + 1,
        text: messageText,
      },
    ]);
  };

  const RenderItem = ({item, index}: {item: MockMessage; index: number}) => {
    return (
      <UserMessage img={chatModalData.img} message={item} isSelf={item.isSelf} isLast={index === messages.length - 1} />
    );
  };

  const Separator = () => <View height={12} />;
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
            data={messages}
            style={styles.flat}
            keyExtractor={item => item.order.toString()}
            renderItem={RenderItem}
            contentContainerStyle={styles.flatPadding}
            ItemSeparatorComponent={Separator}
          />
        </View>
        <View
          style={[
            styles.inputWrapper,
            {marginBottom: (Platform.select({ios: keyboardHeight, android: 0}) as number) + 6},
          ]}
        >
          <Input
            fontSize={16}
            placeholder="Bir mesaj yaz..."
            value={messageText}
            onChangeText={setMessageText}
            style={styles.input}
            height={60}
          />
          <AppButton text="Gönder" width={SCREEN_WIDTH / 5} fontSize={12} onPress={onSendMessage} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flat: {flex: 1},
  cross: {position: 'absolute', right: 16},
  flatPadding: {paddingHorizontal: 20},
  inputWrapper: {marginTop: 'auto', marginHorizontal: 20, flexDirection: 'row', alignItems: 'center'},
  input: {flex: 1, marginRight: 8},
  userImage: {width: 30, height: 30, borderRadius: 99, marginRight: 12},
});

export default ChatModal;
