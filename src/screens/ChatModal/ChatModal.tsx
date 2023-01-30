import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {Colors, Text, View} from 'react-native-ui-lib';
import {RouteProp, useRoute} from '@react-navigation/native';

import {Input, AppButton, WithFocus, LahmacLoading} from 'components';
import Header from './components/Header';
import UserMessage from './components/UserMessage';

import {useKeyboard} from '@hooks';
import {sendMessage, wipeUnreadMessages} from 'api/conversation';
import {removeSocketEvents, socket, SOCKET_CONTANTS} from 'controllers/socketController';
import {Message} from 'services/types/conversation';
import {ImageResponse} from 'services/types/auth';
import {useAuth} from 'store';
import useConversations from 'store/conversation';

// utils
import {SCREEN_WIDTH} from 'utils/help';
import {debounce} from 'lodash';

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
  const [loading, setLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    getMessages(chatModalData.matchId);
  }, []);

  useEffect(() => {
    socket.on(SOCKET_CONTANTS.RECEIVE_MESSAGE, onReceiveMessage);
    socket.on(SOCKET_CONTANTS.IS_WRITING, () => setIsWriting(true));
    socket.on(SOCKET_CONTANTS.IS_NOT_WRITING, () => setIsWriting(false));
  }, []);

  useEffect(() => {
    console.log('messages changed', flatRef.current);
    if (flatRef.current) {
      setTimeout(() => {
        console.log('scrolling to end!');
        flatRef.current?.scrollToEnd();
      }, 200);
    }
  }, [messages, keyboardHeight, flatRef]);

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

  const onReceiveMessage = async (data: {msg: string}) => {
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
  };

  const getMessages = async (matchId: string) => {
    try {
      setLoading(true);
      const res = await wipeUnreadMessages({matchId});
      setConversations(res.data);
      const foundMessages = res.data.find(c => c.matchId === matchId)?.messages || [];
      setMessages(foundMessages);
    } catch (error) {
      console.log({error});
    } finally {
      setLoading(false);
    }
  };

  const notWritingDebounce = useMemo(() => {
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
        {loading ? (
          <View flex-1 center>
            <Text large white>
              Mesajlar yükleniyor...
            </Text>
            <LahmacLoading small />
          </View>
        ) : (
          <>
            <FlatList
              ref={flatRef}
              data={messages}
              style={styles.flat}
              keyExtractor={item => item.createdAt?.toString()}
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
                  notWritingDebounce();
                }}
                style={styles.input}
                height={60}
              />
              <AppButton text="Gönder" width={SCREEN_WIDTH / 5} fontSize={12} onPress={onSendMessage} />
            </View>
          </>
        )}
      </View>
    </WithFocus>
  );
};

const styles = StyleSheet.create({
  flat: {
    flex: 1,
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
});

export default ChatModal;
