import React, {useMemo, useState} from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Colors, Image, Text} from 'react-native-ui-lib';
import {useHeaderHeight} from '@react-navigation/elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import {pickImage} from '../controllers/ImageController';

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

const RegisterPhotos = () => {
  const height = useHeaderHeight();
  const {top} = useSafeAreaInsets();
  const [photos, setPhotos] = useState<ImageOrVideo[]>(photoBoxes);

  const photoStrings = useMemo(() => photos.filter(photo => photo.data), [photos]);

  const getPhoto = async (item, index) => {
    if (photoStrings.length !== index) return;
    const image = await pickImage();
    const photosClone = [...photos];
    photosClone[index].data = image;
    ImgToBase64.getBase64String(image.path).then(res => {
      photosClone[index].base64 = res;
      setPhotos(photosClone);
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <Pressable onPress={() => getPhoto(item, index)} style={styles.item}>
        {item.data && (
          <Image
            source={{uri: `data:image/${item.mime};base64,${item.base64}`}}
            style={{width: '100%', height: '100%'}}
          />
        )}
      </Pressable>
    );
  };

  return (
    <ScrollView style={{backgroundColor: Colors.secondary, paddingTop: height + top + 24, paddingHorizontal: 24}}>
      <Text whitish center large>
        Fotoğraf Ekle
      </Text>
      <FlatList
        style={styles.flatList}
        numColumns={2}
        data={photos}
        renderItem={renderItem}
        columnWrapperStyle={styles.column}
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
  },

  column: {
    justifyContent: 'space-between',
    marginTop: 12,
  },
});

export default RegisterPhotos;
