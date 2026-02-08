import { User } from "./user";

export interface ISignUpResponse {
  access_token: string;
  user: User;
}

export type ISignUpEvent = Pick<
  User,
  "first_name" | "last_name" | "email" | "password" 
>;

export type IForgotPassEvent = Pick<User, "email">;

export interface INewPasswordRequest {
  token: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface INewPasswordEvent {
  password: string;
  confirm_password: string;
}
