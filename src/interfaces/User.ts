
export interface IUserEntity {
  name: string;
  email: string;
  password: string;
  id?: string;
}

export interface IUsersState {
  user: IUserEntity & { remember: boolean };
  users: IUserEntity[];
}

export interface IAuthLoginBody {
  email: string;
  password: string;
  remember: boolean;
}
export interface IAuthLoginResponse {
  user: IUserEntity;
}
