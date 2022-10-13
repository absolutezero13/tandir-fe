import ImageCropPicker, {ImageOrVideo, Options} from 'react-native-image-crop-picker';

const options: Options = {
  width: 1200,
  height: 1200,
  cropping: true,
};
export const pickImage = async (): Promise<ImageOrVideo> => {
  const image = await ImageCropPicker.openPicker(options);
  return image;
};
