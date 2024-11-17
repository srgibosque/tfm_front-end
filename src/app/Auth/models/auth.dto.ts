export class AuthDTO {
  userId: number | null;
  token: string | null;
  email: string;
  password: string;

  constructor(
    userId: number | null,
    token: string | null,
    email: string,
    password: string
  ) {
    this.userId = userId;
    this.token = token;
    this.email = email;
    this.password = password;
  }
}