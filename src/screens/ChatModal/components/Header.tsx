import {useCustomNavigation} from 'hooks';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, View, Text} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {Shadows} from 'utils/designSystem';

const Header = ({username}: {username: string}) => {
  const {goBack} = useCustomNavigation();

  return (
    <View style={styles.header}>
      <Text center xlarge accent>
        {username}
      </Text>
      <TouchableOpacity onPress={goBack} style={styles.cross}>
        <Icon name="close" color={Colors.accent} size={40} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.accent,
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 20,
    justifyContent: 'space-between',
    ...Shadows.dark,
  },
  cross: {
    right: 16,
  },
});

export default Header;
