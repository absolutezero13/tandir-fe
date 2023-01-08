import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, Text, View} from 'react-native-ui-lib';
import {useKeyboard} from '@hooks';
import {SCREEN_WIDTH} from 'utils/help';
import {Input, AppButton, WithFocus} from 'components';
import {removeSocketEvents, socket, SOCKET_CONTANTS} from 'controllers/socketController';
import {debounce} from 'lodash';
import {getConversation, sendMessage, wipeUnreadMessages} from 'api/conversation';
import {Message} from 'services/types/conversation';
import {useAuth} from 'store';
import {RouteProp, useRoute} from '@react-navigation/native';
import useConversations from 'store/conversation';
import UserMessage from './components/UserMessage';
import {ImageResponse} from 'services/types/auth';
import Header from './components/Header';

type RouteProps = {
  params: {
    chatModalData: {
      _id: string;
      username: string;
      img: ImageResponse;
      matchId: string;
    };
  };
};

const ChatModal = () => {
  const chatModalData = useRoute<RouteProp<RouteProps, 'params'>>()?.params?.chatModalData;
  const {setConversations} = useConversations();
  const {keyboardHeight} = useKeyboard();
  const {user} = useAuth();

  const flatRef = useRef<FlatList>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isWriting, setIsWriting] = useState(false);

  const getMessages = async (matchId: string) => {
    try {
      const res = await wipeUnreadMessages({matchId});
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
    if (flatRef?.current) {
      setTimeout(() => {
        flatRef.current?.scrollToEnd();
      }, 200);
    }
  }, [messages, keyboardHeight, flatRef]);

  useEffect(() => {
    socket.on(SOCKET_CONTANTS.RECEIVE_MESSAGE, async data => {
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
    socket.on(SOCKET_CONTANTS.IS_WRITING, () => setIsWriting(true));
    socket.on(SOCKET_CONTANTS.IS_NOT_WRITING, () => setIsWriting(false));
  }, []);

  const onSendMessage = async () => {
    if (messageText === '') {
      return;
    }
    setMessageText('');

    socket.emit(SOCKET_CONTANTS.MESSAGE, messageText, chatModalData.matchId, user._id);
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
    const func = debounce(() => socket.emit(SOCKET_CONTANTS.IS_NOT_WRITING, chatModalData.matchId), 1500);
    return func;
  }, []);

  const RenderItem = ({item, index}: {item: Message; index: number}) => {
    return <UserMessage img={chatModalData.img} message={item} isLast={index === messages.length - 1} user={user} />;
  };

  const Separator = () => <View height={12} />;

  return (
    <WithFocus onBlur={() => removeSocketEvents([SOCKET_CONTANTS.IS_NOT_WRITING, SOCKET_CONTANTS.IS_WRITING])}>
      <View useSafeArea backgroundColor={Colors.secondary} flex-1>
        <Header username={chatModalData?.username} />
        <FlatList
          ref={flatRef}
          data={messages}
          style={styles.flat}
          keyExtractor={item => item.createdAt.toString()}
          renderItem={RenderItem}
          contentContainerStyle={styles.flatPadding}
          ItemSeparatorComponent={Separator}
        />
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
              socket.emit(SOCKET_CONTANTS.IS_WRITING, chatModalData.matchId);
              setMessageText(val);
              debouncedFunc();
            }}
            style={styles.input}
            height={60}
          />
          <AppButton text="Gönder" width={SCREEN_WIDTH / 5} fontSize={12} onPress={onSendMessage} />
        </View>
      </View>
    </WithFocus>
  );
};

const styles = StyleSheet.create({
  flat: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.accent,
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 20,
    justifyContent: 'space-between',
  },
  cross: {
    right: 16,
  },
  flatPadding: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputWrapper: {
    marginTop: 'auto',
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 99,
    marginRight: 12,
  },
});

export default ChatModal;
