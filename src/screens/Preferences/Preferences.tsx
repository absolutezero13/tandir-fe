import React, {useState} from 'react';
import {Colors, RadioButton, Text, View} from 'react-native-ui-lib';
import useContainerStyle from 'hooks/useContainerStyles';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {SCREEN_WIDTH} from 'utils/help';
import {StyleSheet} from 'react-native';

const Preferences = () => {
  const [preferencesFields, setPreferencesFields] = useState({
    distance: 50,
    gender: {
      male: false,
      female: false,
      all: false,
    },
    ages: [18, 40],
  });
  const containerStyles = useContainerStyle();

  return (
    <View style={containerStyles} flex-1>
      <View center>
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
      <View center>
        <Text xlarge accent marginB-12>
          Yaş Aralığı
        </Text>
        <Text medium accent bold>
          {preferencesFields.ages[0]} - {preferencesFields.ages[1]}
        </Text>
        <MultiSlider
          values={preferencesFields.ages}
          max={80}
          min={18}
          step={1}
          sliderLength={SCREEN_WIDTH - 60}
          trackStyle={styles.track}
          selectedStyle={{backgroundColor: Colors.primary}}
          onValuesChange={vals =>
            setPreferencesFields(prev => ({
              ...prev,
              ages: vals,
            }))
          }
        />
      </View>
      <View marginT-24 center>
        <Text xlarge accent marginB-24>
          Aradığım Lahmaç Cinsiyeti
        </Text>
        <View row>
          <View row centerV>
            <RadioButton
              selected={preferencesFields.gender.male}
              onPress={() => setPreferencesFields(prev => ({...prev, gender: {female: false, all: false, male: true}}))}
            />
            <Text accent medium bold marginL-8>
              Erkek{' '}
            </Text>
          </View>
          <View row centerV>
            <RadioButton
              selected={preferencesFields.gender.female}
              onPress={() => setPreferencesFields(prev => ({...prev, gender: {female: true, all: false, male: false}}))}
            />
            <Text accent medium bold marginL-8>
              Kadın{' '}
            </Text>
          </View>
          <View row centerV>
            <RadioButton
              selected={preferencesFields.gender.all}
              onPress={() => setPreferencesFields(prev => ({...prev, gender: {female: false, all: true, male: false}}))}
            />
            <Text accent medium bold marginL-8>
              Alayı{' '}
            </Text>
          </View>
        </View>
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
