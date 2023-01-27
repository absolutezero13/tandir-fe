import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {View, Modal} from 'react-native-ui-lib';

import {WithFocus} from 'components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from 'utils/help';
import {useCustomNavigation} from 'hooks';
import lahmac from '@assets/images/lahmac.png';

const initialLahmacs = [
  {
    top: SCREEN_HEIGHT / 2,
    right: SCREEN_WIDTH / 2,
  },
];

const LahmacBomb = ({setVisible}: {setVisible: any}) => {
  const {navigate} = useCustomNavigation();
  const [lahmacs, setLahmacs] = useState(initialLahmacs);
  const [lahmacSize, setLahmacSize] = useState(100);

  const clearIntervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    clearIntervalRef.current = setInterval(() => {
      setLahmacSize(prev => prev + 0.1);
      setLahmacs(prev => [...prev, {right: SCREEN_WIDTH * Math.random(), top: SCREEN_HEIGHT * Math.random()}]);
    }, 1);

    return () => {
      clearInterval(clearIntervalRef.current as NodeJS.Timer);
    };
  }, []);

  useEffect(() => {
    if (lahmacs.length === 100) {
      setVisible(false);
      navigate('Main');
    }
  }, [lahmacs, navigate, setVisible]);

  return (
    <Modal visible transparent>
      <WithFocus onFocus={() => setLahmacs(initialLahmacs)}>
        <View>
          {lahmacs.map((el, index) => {
            return (
              <FastImage
                key={index}
                source={lahmac}
                style={[
                  {
                    height: lahmacSize,
                    width: lahmacSize,
                    right: el.right,
                    top: el.top,
                  },
                  styles.container,
                ]}
              />
            );
          })}
        </View>
      </WithFocus>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default LahmacBomb;
