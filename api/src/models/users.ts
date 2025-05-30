export type Role = 'admin' | 'user' | 'guest';

export type UserToken = {
  email: string;
  roles: Role[];
  picture: string;
  nickname: string;
  created_at: string;
  given_name: string;
  updated_at: string;
  family_name: string;
  phone_number: string;
  email_verified: boolean;
  phone_number_verified: boolean;
};
