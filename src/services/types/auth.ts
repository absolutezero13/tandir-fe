export type TGender = 'male' | 'female' | 'another';

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
  gender: string; // temporary;
  birthDate: Date | string;
  description: string;
  pictures: {image: string; order: number}[];
  matches: string[];
  likes: string[];
  role: string;
  createdAt: string;
  city: string;
  county: string;
  geometry: {
    type: string;
    geometry: [number, number];
  };
}

export type ILoginUser = {
  username: string;
  password: string;
};

export type ILoginResponse = {
  token: string;
  refreshToken: string;
  user: IUser;
};

export type ImageResponse = {
  imageUrl: string;
  imageName: string;
};
