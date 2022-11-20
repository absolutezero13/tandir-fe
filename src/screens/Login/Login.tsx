import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import AppButton from '../../components/AppButton';
import Input from '../../components/Input';
import {useLoading} from '../../zustand';
import haluk from '../../assets/images/haluk.png';
import halukWithGlasses from '../../assets/images/halukWithGlasses.png';
import {useKeyboard} from '../../hooks/useKeyboard';
import {authApi} from '../../services/api';
import {StackActions, useNavigation} from '@react-navigation/native';
import {handleError} from '../../utils/help';

const Login = () => {
  const navigation = useNavigation();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [imageSource, setImageSource] = useState(haluk);
  const {setLoading} = useLoading();
  const {keyboardOpen} = useKeyboard();

  const goToRegisterPage = () => {
    navigation.navigate('Register');
  };

  const login = async () => {
    try {
      setLoading(true);
      const res = await authApi.login({username, password});
      console.log({res});
      navigation.dispatch(StackActions.replace('Tabs'));
      setLoading(false);
    } catch (e: any) {
      handleError(e);
      setLoading(false);
    } finally {
      // setLoading(false);
    }
  };

  const flex = keyboardOpen ? undefined : 1;

  return (
    <View backgroundColor={Colors.secondary} flex-1 paddingH-24>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{justifyContent: 'center', flex}}
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

export default Login;
