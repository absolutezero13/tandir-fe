import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Platform, Pressable, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {Colors, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {useCustomNavigation, useKeyboard} from '@hooks';
import {SCREEN_WIDTH} from '../utils/help';
import Input from './Input';
import AppButton from './AppButton';
import {socket} from 'controllers/socketController';
import {debounce} from 'lodash';
import {getConversation, sendMessage, wipeUnreadMessages} from 'api/conversation';
import {Message} from 'services/types/conversation';
import {useAuth} from 'store';
import {IUser} from 'services/types/auth';
import {useRoute} from '@react-navigation/native';
import useConversations from 'store/conversation';

interface IUserMessage {
  img: string;
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

const ChatModal = () => {
  const chatModalData = useRoute()?.params?.chatModalData;
  const {goBack} = useCustomNavigation();
  const {setConversations} = useConversations();
  const {keyboardHeight} = useKeyboard();
  const flatRef = useRef<FlatList>(null);
  const {user} = useAuth();

  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isWriting, setIsWriting] = useState(false);

  const getMessages = async (matchId: string) => {
    try {
      const res = await wipeUnreadMessages({matchId});
      console.log('wipe resp', res);
      setConversations(res.data);
      const resp = await getConversation({matchId});
      setMessages(resp.data.messages);
    } catch (error) {
      console.log({error});
    }
  };

  useEffect(() => {
    getMessages(chatModalData.matchId);
  }, []);

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
    socket.on('receive-message', async data => {
      const msgObj = {
        from: chatModalData._id,
        to: user._id as string,
        message: data.msg,
        createdAt: new Date(),
      };
      if (messages.find(m => m.createdAt === msgObj.createdAt)) {
        return;
      }
      setMessages(prev => [...prev, msgObj]);
    });
    socket.on('is-writing', () => setIsWriting(true));
    socket.on('is-not-writing', () => setIsWriting(false));
  }, []);

  const onSendMessage = async () => {
    if (messageText === '') {
      return;
    }
    socket.emit('message', messageText, chatModalData.matchId, user._id);
    setMessageText('');
    const msgObj = {
      from: user._id as string,
      to: chatModalData._id,
      message: messageText,
      createdAt: new Date(),
    };
    setMessages(prev => [...prev, msgObj]);

    await sendMessage({matchId: chatModalData.matchId, message: msgObj});
  };
  const debouncedFunc = useMemo(() => {
    const func = debounce(() => socket.emit('not-writing', chatModalData.matchId), 1500);
    return func;
  }, []);

  const RenderItem = ({item, index}: {item: Message; index: number}) => {
    return <UserMessage img={chatModalData.img} message={item} isLast={index === messages.length - 1} user={user} />;
  };

  const Separator = () => <View height={12} />;

  return (
    <View useSafeArea backgroundColor={Colors.secondary} flex-1>
      <Text center xlarge accent>
        {chatModalData?.username}{' '}
      </Text>
      <Pressable hitSlop={30} onPress={goBack} style={[styles.cross]}>
        <Icon name="close" color={Colors.accent} size={30} />
      </Pressable>
      <View marginT-24 flex-1>
        <FlatList
          ref={flatRef}
          data={messages}
          style={styles.flat}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={RenderItem}
          contentContainerStyle={styles.flatPadding}
          ItemSeparatorComponent={Separator}
        />
      </View>
      {isWriting && (
        <Text large white>
          Yazıyor...
        </Text>
      )}
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
          onChangeText={val => {
            socket.emit('writing', chatModalData.matchId);
            setMessageText(val);
            debouncedFunc();
          }}
          style={styles.input}
          height={60}
        />
        <AppButton text="Gönder" width={SCREEN_WIDTH / 5} fontSize={12} onPress={onSendMessage} />
      </View>
    </View>
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
