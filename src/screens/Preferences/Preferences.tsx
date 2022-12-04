import React, {useMemo, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Colors, RadioButton, Text, View} from 'react-native-ui-lib';
import useContainerStyle from 'hooks/useContainerStyles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {AppButton} from 'components';
import {handleError, SCREEN_WIDTH} from 'utils/help';
import {updateUser} from 'api/auth';
import {useAuth, useLoading} from 'store';
import {IUser, IUserPreferences} from 'services/types/auth';

const Preferences = () => {
  const {user, setUser} = useAuth();
  const {setLoading} = useLoading();
  const [preferencesFields, setPreferencesFields] = useState(user?.preferences as IUserPreferences);
  const containerStyles = useContainerStyle();

  const updateUserPreferences = async () => {
    try {
      setLoading(true);

      await updateUser({preferences: preferencesFields});
      setUser({...(user as IUser), preferences: preferencesFields});
      Alert.alert('Bilgilerin başarıyla güncellendi.');
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const disabled = useMemo(() => {
    return JSON.stringify(preferencesFields) === JSON.stringify(user?.preferences);
  }, [preferencesFields, user]);

  return (
    <View style={containerStyles} flex-1>
      <View>
        <Text xlarge accent marginB-12>
          Eşleşme Mesafesi
        </Text>
        <Text medium accent bold>
          {preferencesFields.distance} KM
        </Text>
        <MultiSlider
          min={0}
          max={300}
          step={1}
          sliderLength={SCREEN_WIDTH - 60}
          values={[preferencesFields.distance]}
          trackStyle={styles.track}
          selectedStyle={{backgroundColor: Colors.primary}}
          onValuesChange={val => setPreferencesFields(prev => ({...prev, distance: val[0]}))}
        />
      </View>
      <View>
        <Text xlarge accent marginB-12>
          Yaş Aralığı
        </Text>
        <Text medium accent bold>
          {preferencesFields.ages.min} - {preferencesFields.ages.max}
        </Text>
        <MultiSlider
          values={[preferencesFields.ages.min, preferencesFields.ages.max]}
          max={80}
          min={18}
          step={1}
          sliderLength={SCREEN_WIDTH - 60}
          trackStyle={styles.track}
          selectedStyle={{backgroundColor: Colors.primary}}
          onValuesChange={vals =>
            setPreferencesFields(prev => ({
              ...prev,
              ages: {
                min: vals[0],
                max: vals[1],
              },
            }))
          }
        />
      </View>
      <View marginT-24>
        <Text xlarge accent marginB-24>
          Aradığım Lahmaç Cinsiyeti
        </Text>
        <View row>
          <View row centerV>
            <RadioButton
              selected={preferencesFields.gender === 'male'}
              onPress={() => setPreferencesFields(prev => ({...prev, gender: 'male'}))}
            />
            <Text accent medium bold marginL-8>
              Erkek{' '}
            </Text>
          </View>
          <View row centerV>
            <RadioButton
              selected={preferencesFields.gender === 'female'}
              onPress={() => setPreferencesFields(prev => ({...prev, gender: 'female'}))}
            />
            <Text accent medium bold marginL-8>
              Kadın{' '}
            </Text>
          </View>
          <View row centerV>
            <RadioButton
              selected={preferencesFields.gender === 'all'}
              onPress={() => setPreferencesFields(prev => ({...prev, gender: 'all'}))}
            />
            <Text accent medium bold marginL-8>
              Alayı{' '}
            </Text>
          </View>
        </View>
      </View>
      <View center marginT-48>
        <AppButton disabled={disabled} text="Uygula" width={SCREEN_WIDTH / 2} onPress={updateUserPreferences} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 4,
    backgroundColor: Colors.accent,
  },
});

export default Preferences;
