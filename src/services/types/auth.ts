export type TGender = 'male' | 'female' | 'another';

type MatchType = {
  userId: string;
  matchId: string;
};

export type TUserImage = {image: string; order: number};

export interface IUser {
  _id?: string;
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
  gender: string; // temporary;
  birthDate: Date | string;
  birthDateInMs: number;
  description: string;
  pictures: TUserImage[];
  matches: MatchType[];
  likes: string[];
  dislikes: string[];
  role: string;
  createdAt: string;
  city: string;
  county: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  preferences: IUserPreferences;
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

export type IUserPreferences = {
  distance: number;
  gender: string;
  ages: {
    max: number;
    min: number;
  };
};
