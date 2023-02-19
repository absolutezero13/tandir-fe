import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib';

const styles = StyleSheet.create({
  image: {width: 140, height: 140, borderRadius: 999, borderWidth: 1, borderColor: Colors.accent},
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.accent,
    padding: 10,
    paddingVertical: 8,
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 16,
    color: Colors.accent,
    marginTop: 20,
  },
  myPhotos: {
    marginTop: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    paddingBottom: 40,
  },
});

export default styles;
