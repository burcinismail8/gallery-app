export interface IUser {
  email: string;
  name: string;
  password: string;
  photos: [{ tags: Array<string>; url: string }];
}
