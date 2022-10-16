import React, {useMemo, useRef, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
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
  const viewRef = useRef<typeof View>();
  const filteredData = useMemo(() => {
    if (!searchText) return [];
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
        animationType="slide"
        visible={visible}
        transparent
        overlayBackgroundColor="rgba(0,0,0,0.4)"
        onBackgroundPress={() => setVisible(false)}
      >
        <View style={styles.dropDown} ref={viewRef}>
          <TextInput
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
                height: filteredData.length * 40,
              },
            ]}
            data={filteredData}
            renderItem={renderItem}
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
    marginTop: Dimensions.get('screen').height / 2.5,
    borderRadius: 32,
  },
  item: {
    textAlign: 'center',
    fontSize: 24,
    borderBottomWidth: 1,
    height: 30,
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
