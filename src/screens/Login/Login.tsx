import React from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import {AppButton, Input} from '@components';
import haluk from '@assets/images/haluk.png';
import halukWithGlasses from '@assets/images/halukWithGlasses.png';
import useLogin from './useLogin';

const Login = () => {
  const {
    goToRegisterPage,
    imageSource,
    keyboardOpen,
    login,
    password,
    setImageSource,
    setPassword,
    setusername,
    username,
  } = useLogin();

  return (
    <View backgroundColor={Colors.secondary} flex-1 paddingH-24>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.container, keyboardOpen ? styles.noFlex : styles.flex1]}
      >
        <View>
          <View marginB-24>
            <View centerH>
              <Image source={imageSource} resizeMode="contain" />
            </View>
            <Input
              value={username}
              onChangeText={setusername}
              placeholder="Kullanıcı Adı"
              placeholderTextColor="white"
            />
          </View>
          <View>
            <Input
              onFocus={() => setImageSource(halukWithGlasses)}
              onBlur={() => setImageSource(haluk)}
              value={password}
              onChangeText={setPassword}
              placeholder="Şifre"
              placeholderTextColor="white"
              secureTextEntry
            />
          </View>
        </View>
        <View marginT-24 center row>
          <Text white>Hesabın yok mu?</Text>
          <Text onPress={goToRegisterPage} color={Colors.accent} underline>
            {' '}
            Kayıt ol
          </Text>
        </View>
        <View marginT-12 center>
          <Text small white bold>
            *Kayıt olmak için en az 18 yaşında olmalısın.
          </Text>
          <Text small white bold>
            Yoksa “FBI OPEN UP!” oluruz.
          </Text>
        </View>
        <View center>
          <AppButton disabled={!username || !password} text="Giriş Yap" onPress={login} marginT-24 marginB-24 />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  noFlex: {
    flex: undefined,
  },
  container: {
    justifyContent: 'center',
  },
});

export default Login;
