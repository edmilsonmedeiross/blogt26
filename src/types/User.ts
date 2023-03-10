export type Roles = "admin" | "mod" | "user";

export default interface User {
  userId: String;
  name: String;
  email: String;
  password: String;
  role: Roles;
  bio: String | null;
}

export interface UserObj {
  user: User
}
