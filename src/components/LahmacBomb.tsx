import React, {useEffect, useRef, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {View, Modal} from 'react-native-ui-lib';
import lahmac from '@assets/images/lahmac.png';
import {WithFocus} from 'components';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from 'utils/help';
import {useCustomNavigation} from 'hooks';

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
    }, 5);

    return () => {
      clearInterval(clearIntervalRef.current as NodeJS.Timer);
    };
  }, []);

  useEffect(() => {
    if (lahmacs.length === 100) {
      setVisible(false);
      navigate('Main');
    }
  }, [lahmacs]);

  return (
    <Modal visible transparent>
      <WithFocus onFocus={() => setLahmacs(initialLahmacs)}>
        <View>
          {lahmacs.map((el, index) => {
            return (
              <FastImage
                key={index}
                source={lahmac}
                style={{
                  height: lahmacSize,
                  width: lahmacSize,
                  position: 'absolute',
                  right: el.right,
                  top: el.top,
                }}
              />
            );
          })}
        </View>
      </WithFocus>
    </Modal>
  );
};

export default LahmacBomb;
