import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, KeyboardEvent, Modal, Platform, Pressable, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {KeyboardAwareFlatList, KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {useKeyboard} from '../hooks/useKeyboard';
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

const UserMessage = ({img, message, isSelf}) => {
  const alignSelf = isSelf ? 'flex-end' : 'flex-start';
  return (
    <View row style={{alignSelf}} center marginT-12>
      {!isSelf && <Image source={{uri: img}} style={styles.userImage} />}
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

  useEffect(() => {
    if (chatModalData) {
      console.log('use effecT!');

      setTimeout(() => {
        console.log('scroll to end!');

        flatRef.current?.scrollToEnd();
      }, 100);
    }
  }, [keyboardHeight, chatModalData]);

  console.log(keyboardHeight);

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
            style={{flex: 1}}
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
  cross: {position: 'absolute', right: 16},
  flatPadding: {paddingHorizontal: 20, paddingBottom: 40},
  inputWrapper: {marginTop: 'auto', marginHorizontal: 20},
  userImage: {width: 30, height: 30, borderRadius: 99, marginRight: 12},
});

export default ChatModal;
