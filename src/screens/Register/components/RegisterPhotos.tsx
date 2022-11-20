import React, {useMemo} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Colors, Image, Text, View} from 'react-native-ui-lib';
import {Pressable, StyleSheet} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {pickImage} from '../../../controllers/ImageController';
import AppButton from '../../../components/AppButton';
import Icon from 'react-native-vector-icons/Ionicons';
import useContainerStyles from '../../../hooks/useContainerStyles';
import {createFormData, SCREEN_WIDTH} from '../../../utils/help';
import {RouteProp, useRoute} from '@react-navigation/native';
import {deleteImage, uploadImages} from '../../../services/api/auth';
import {useAuth, useLoading} from '../../../zustand';
import {authApi} from '../../../services/api';
import {ImageResponse} from '../../../services/types/auth';

interface IPhoto {
  data: null | (ImageOrVideo & ImageResponse);
}

type RouteProps = {
  params: {
    updating?: boolean;
  };
};

const RegisterPhotos = ({setStep, photos, setPhotos}: {setStep: Function; setPhotos: Function; photos: IPhoto[]}) => {
  const containerStyles = useContainerStyles();
  const {user, setUserImages} = useAuth();
  const {setLoading} = useLoading();
  const isUpdating = useRoute<RouteProp<RouteProps, 'params'>>().params?.updating;
  const photoStrings = useMemo(() => photos.filter(photo => photo.data), [photos]);

  const getPhoto = async (index: number) => {
    try {
      const image = await pickImage();

      if (isUpdating) {
        setLoading(true);
        const formData = createFormData([
          {
            data: image,
          },
        ]);
        await uploadImages(formData, user?._id as string);
        const images = await authApi.getImages(user?._id as string);
        setUserImages(images);
      } else {
        const photosClone = [...photos];
        photosClone[index].data = image;
        setPhotos(photosClone);
      }
    } catch (err) {
      ////
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = async (index: number) => {
    if (isUpdating) {
      try {
        setLoading(true);
        await deleteImage(user?._id as string, photos[index]?.data?.imageName as string);
        const images = await authApi.getImages(user?._id as string);
        console.log({images});
        setUserImages(images);
      } catch (error) {
        console.log({error});
      } finally {
        setLoading(false);
      }
    } else {
      const photosClone = [...photos];
      photosClone[index].data = null;
      setPhotos(photosClone);
    }
  };

  console.log({photos});

  const renderItem = ({item, index}: {item: IPhoto; index: number}) => {
    return (
      <Pressable onPress={item.data ? undefined : () => getPhoto(index)} style={styles.item}>
        {item.data && (
          <Pressable onPress={() => deletePhoto(index)} style={styles.cross}>
            <Icon name="close" size={25} color={Colors.primary} />
          </Pressable>
        )}

        {!item.data && <Icon name="add-outline" size={50} color={Colors.accent} />}
        {item.data && <Image source={{uri: item.data.path}} style={styles.img} />}
      </Pressable>
    );
  };

  const ListFooterComponent = () => {
    return (
      <View row spread width={'100%'}>
        <AppButton
          width={SCREEN_WIDTH / 2 - 40}
          iconName="arrow-back-outline"
          iconPosition="left"
          text="Geri"
          onPress={() => setStep(1)}
        />
        <AppButton
          iconName="arrow-forward-outline"
          width={SCREEN_WIDTH / 2 - 40}
          iconPosition="right"
          text="İleri"
          disabled={photoStrings.length === 0}
          onPress={() => setStep(3)}
        />
      </View>
    );
  };

  return (
    <View style={[containerStyles, styles.padding0]} flex-1>
      <Text marginT-24 whitish center xlarge>
        Müthiş fotoğraflarından koy.
      </Text>
      <FlatList
        bounces={false}
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
        numColumns={2}
        data={photos}
        renderItem={renderItem}
        columnWrapperStyle={styles.column}
        ListFooterComponent={isUpdating ? undefined : ListFooterComponent}
        ListFooterComponentStyle={styles.listFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  padding0: {paddingHorizontal: 0},
  flatList: {
    marginTop: 24,
  },
  item: {
    borderWidth: 2,
    width: (SCREEN_WIDTH - 72) / 2,
    height: (SCREEN_WIDTH - 72) / 2,
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
  cross: {
    backgroundColor: Colors.accent,
    borderRadius: 50,
    position: 'absolute',
    right: -12.5,
    top: -12.5,
    zIndex: 2,
    elevation: 2,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});

export default RegisterPhotos;
