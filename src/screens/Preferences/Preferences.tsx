import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, RadioButton, Text, View} from 'react-native-ui-lib';
import {AppButton} from 'components';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {SCREEN_WIDTH} from 'utils/help';
import usePreferences from './usePreferences';

const Preferences = () => {
  const {disabled, preferencesFields, setPreferencesFields, updateUserPreferences, markerStyle} = usePreferences();
  return (
    <View flex-1 style={styles.wrapper}>
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
          markerStyle={markerStyle}
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
          markerStyle={markerStyle}
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
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: Colors.secondary,
  },
  track: {
    height: 4,
    backgroundColor: Colors.accent,
  },
});

export default Preferences;
