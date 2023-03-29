export type Roles = 'admin' | 'mod' | 'user';
export default interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: Roles;
  bio: string | null;
};
export interface UserObj {
  user: User;
}
