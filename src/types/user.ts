export interface User {
  id?: number;
  username: string;
  email: string;
  msisdn: string;
  createdAt?: Date;
}

export interface UsersState {
  currentUser: User;
  usersList: User[];
}
