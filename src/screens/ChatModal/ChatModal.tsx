import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Platform} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {Colors, Text, View} from 'react-native-ui-lib';
import {RouteProp, useRoute} from '@react-navigation/native';

import {Input, AppButton, LahmacLoading} from 'components';
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
import styles from './styles';
import {services} from 'services';

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
  const route = useRoute<RouteProp<RouteProps, 'params'>>();
  const {chatModalData} = route.params;

  const {setConversations} = useConversations();
  const {keyboardHeight} = useKeyboard();
  const {user} = useAuth();

  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [numberOfMessages, setNumberOfMessages] = useState(20);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    getMessages(chatModalData.matchId);
    socket.on(SOCKET_CONTANTS.RECEIVE_MESSAGE, onReceiveMessage);
    socket.on(SOCKET_CONTANTS.IS_WRITING, () => setIsWriting(true));
    socket.on(SOCKET_CONTANTS.IS_NOT_WRITING, () => setIsWriting(false));
    return () => {
      removeSocketEvents([SOCKET_CONTANTS.IS_WRITING, SOCKET_CONTANTS.IS_NOT_WRITING]);
    };
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
  const onReceiveMessage = async (data: {msg: string}) => {
    const currentRoute = services.nav.navRef.current?.getCurrentRoute();
    if (currentRoute?.name !== 'ChatModal') {
      return;
    }

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
      const res = await wipeUnreadMessages({matchId});
      setConversations(res.data);
      const foundMessages = res.data.find(c => c.matchId === matchId)?.messages || [];
      setMessages(foundMessages);
    } catch (error) {
      console.log({error});
    } finally {
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
    <View useSafeArea backgroundColor={Colors.secondary} flex-1>
      <Header username={chatModalData?.username} />
      <FlatList
        data={messages.slice(numberOfMessages * -1).reverse()}
        style={styles.flat}
        keyExtractor={item => item.createdAt?.toString()}
        renderItem={RenderItem}
        onScroll={e => {
          // get more messages if scrolled to top
          console.log(e.nativeEvent.contentOffset.y);
          if (e.nativeEvent.contentOffset.y <= -25 && numberOfMessages < messages.length) {
            setNumberOfMessages(prev => prev + 20);
          }
        }}
        contentContainerStyle={styles.flatPadding}
        ItemSeparatorComponent={Separator}
        inverted
        ListEmptyComponent={() => (
          <View flex-1 center height={200}>
            <Text large white>
              Mesajlar yükleniyor...
            </Text>
            <LahmacLoading small />
          </View>
        )}
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
    </View>
  );
};

export default ChatModal;
