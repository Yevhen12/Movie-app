export type UserType = {
  _id: string;
  username: string;
  avatarPhoto?: string;
  email: string;
  password: string;
  role: RoleType;
  comments: [string]
  likedMovies: [string]
};

export type RoleType = 'user' | 'admin'