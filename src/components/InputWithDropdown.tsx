import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {MarginModifiers, Text, Modal, View, Colors} from 'react-native-ui-lib';
import {TextFieldProps} from 'react-native-ui-lib/typings';
import Input from './Input';

interface IDropwdownProps {
  data: string[];
  onItemPress: any;
  searchPlaceHolder: string;
}

const InputWithDropdown = (props: TextFieldProps & MarginModifiers & IDropwdownProps) => {
  const [searchText, setSearchText] = useState('');
  const [visible, setVisible] = useState(false);
  const viewRef = useRef<typeof View>(null);
  const inputRef = useRef<typeof TextInput>(null);

  const filteredData = useMemo(() => {
    if (!searchText) {
      return props.data;
    }
    return props.data.filter(el => el.toLocaleLowerCase('tr').includes(searchText?.toLocaleLowerCase('tr')));
  }, [searchText]);

  const renderItem = ({item}: {item: string}) => {
    return (
      <Text
        onPress={() => {
          setVisible(false);
          props.onItemPress(item);
        }}
        white
        bold
        style={styles.item}
      >
        {item}{' '}
      </Text>
    );
  };

  return (
    <View marginB-12>
      <Input {...props} onPressIn={() => setVisible(true)} />
      <Modal
        onDismiss={() => setSearchText('')}
        animationType="fade"
        visible={visible}
        transparent
        overlayBackgroundColor="rgba(0,0,0,0.4)"
        onBackgroundPress={() => setVisible(false)}
      >
        <View style={styles.dropDown} ref={viewRef}>
          <TextInput
            ref={inputRef}
            placeholderTextColor="white"
            placeholder={props.searchPlaceHolder}
            autoCapitalize="none"
            style={styles.textInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            style={[
              {
                height: filteredData.length * 46,
              },
            ]}
            data={filteredData}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View height={1} backgroundColor={Colors.whitish} marginV-12 />}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDown: {
    maxHeight: 350,
    backgroundColor: Colors.primary,
    width: '90%',
    zIndex: 99,
    alignSelf: 'center',
    marginBottom: 12,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginTop: 100,
    borderRadius: 32,
  },
  item: {
    textAlign: 'center',
    fontSize: 24,
    height: 36,
    marginVertical: 8,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    color: 'white',
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 'bold',
  },
});

export default InputWithDropdown;
