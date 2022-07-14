import React, {useState} from 'react';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import AppButton from '../components/AppButton';
import Input from '../components/Input';
import {useServices} from '../services';

const haluk = require('../assets/images/haluk.png');
const halukWithGlasses = require('../assets/images/halukWithGlasses.png');

const Login = () => {
  const {nav} = useServices();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [imageSource, setImageSource] = useState(haluk);

  const goToRegisterPage = () => {
    nav.push('Register');
  };

  const login = () => {
    nav.push('Tabs');
  };

  return (
    <View backgroundColor={Colors.primary} flex-1 centerV paddingH-24 paddingB-40>
      <View>
        <View marginB-24>
          <View centerH>
            <Image source={imageSource} resizeMode="contain" />
          </View>
          <Input value={userName} onChangeText={setUserName} placeholder="Kullanıcı Adı" placeholderTextColor="white" />
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
        <Text small white>
          *Kayıt olmak için en az 18 yaşında olmalısın.
        </Text>
        <Text small white>
          Yoksa “FBI OPEN UP!” oluruz.
        </Text>
      </View>
      <View center>
        <AppButton disabled={!userName || !password} text="Giriş Yap" onPress={login} marginT-24 marginB-24 />
      </View>
    </View>
  );
};

export default Login;
