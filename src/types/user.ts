export interface User {
  id: number;
  username: string;
  email: string;
  msisdn: string;
  created_at: Date;
}

export interface Users {
  users: User[];
}
