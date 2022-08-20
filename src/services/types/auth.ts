export interface IUser {
  _id: string;
  userName: string;
  email: string;
  password: string;
  gender: string;
  birthDate: string;
  description: string;
  profilePicture: string;
  matches: string[];
  likes: string[];
  role: string;
  createdAt: string;
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
