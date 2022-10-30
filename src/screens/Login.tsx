import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import AppButton from '../components/AppButton';
import Input from '../components/Input';
import {useServices} from '../services';
import {useLoading} from '../zustand';

const haluk = require('../assets/images/haluk.png');
const halukWithGlasses = require('../assets/images/halukWithGlasses.png');

const Login = () => {
  const {nav, api} = useServices();
  const {authApi} = api;
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [imageSource, setImageSource] = useState(haluk);
  const {setLoading} = useLoading();

  const goToRegisterPage = () => {
    nav.push('Register');
  };

  const login = async () => {
    try {
      const res = await authApi.login({username, password});
      console.log({res});
      nav.replace('Tabs');
    } catch (e) {
      console.log(e);
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View backgroundColor={Colors.secondary} flex-1 centerV paddingH-24 paddingB-40>
      <View>
        <View marginB-24>
          <View centerH>
            <Image source={imageSource} resizeMode="contain" />
          </View>
          <Input value={username} onChangeText={setusername} placeholder="Kullanıcı Adı" placeholderTextColor="white" />
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
    </View>
  );
};

export default Login;
