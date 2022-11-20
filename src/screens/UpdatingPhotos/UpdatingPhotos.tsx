import React from 'react';
import {formatPhotoData} from '../../utils/help';
import {useAuth} from '@store';
import RegisterPhotos from '../Register/components/RegisterPhotos';

const UpdatingPhotos = () => {
  const {userImages, setUserImages} = useAuth();

  const photos = formatPhotoData(userImages);

  return <RegisterPhotos photos={photos} setPhotos={setUserImages} />;
};

export default UpdatingPhotos;
