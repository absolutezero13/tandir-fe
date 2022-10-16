import React, {useMemo, useState} from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Colors, Image, Text} from 'react-native-ui-lib';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import {pickImage} from '../controllers/ImageController';
import AppButton from '../components/AppButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {useServices} from '../services';
import useContainerStyles from '../hooks/useContainerStyles';

const photoBoxes = [
  {
    data: null,
    base64: '',
  },
  {data: null, base64: ''},
  {
    data: null,
    base64: '',
  },
  {data: null, base64: ''},
];

interface IPhoto {
  data: null | ImageOrVideo;
  base64: string;
}
const RegisterPhotos = ({setStep, photos, setPhotos}) => {
  const {nav} = useServices();
  const containerStyles = useContainerStyles();

  const photoStrings = useMemo(() => photos.filter(photo => photo.data), [photos]);

  const getPhoto = async (index: number) => {
    const image = await pickImage();
    const photosClone = [...photos];
    photosClone[index].data = image;
    const base64: string = await ImgToBase64.getBase64String(image.path);
    photosClone[index].base64 = base64;
    setPhotos(photosClone);
  };

  const renderItem = ({item, index}: {item: IPhoto; index: number}) => {
    return (
      <Pressable onPress={() => getPhoto(index)} style={styles.item}>
        {!item.data && <Icon name="add-outline" size={50} color={Colors.accent} />}
        {item.data && <Image source={{uri: `data:image/${item.data.mime};base64,${item.base64}`}} style={styles.img} />}
      </Pressable>
    );
  };

  const ListFooterComponent = () => {
    return <AppButton text="İleri" onPress={() => setStep(2)} />;
  };

  return (
    <ScrollView style={containerStyles}>
      <Text whitish center xlarge>
        Fotoğraf Ekle
      </Text>
      <FlatList
        style={styles.flatList}
        numColumns={2}
        data={photos}
        renderItem={renderItem}
        columnWrapperStyle={styles.column}
        ListFooterComponent={photoStrings.length > 0 ? ListFooterComponent : undefined}
        ListFooterComponentStyle={styles.listFooter}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginTop: 24,
  },
  item: {
    borderWidth: 2,
    width: (Dimensions.get('screen').width - 72) / 2,
    height: (Dimensions.get('screen').width - 72) / 2,
    borderColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },

  column: {
    justifyContent: 'space-between',
    marginTop: 12,
  },
  img: {width: '100%', height: '100%', borderRadius: 6},
  listFooter: {
    alignItems: 'center',
    marginTop: 48,
  },
});

export default RegisterPhotos;
