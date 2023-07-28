import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Movie } from 'src/movie/schemas/movie.schema';
import { DEFAULT_USER_AVATAR_URL } from 'src/contstants/common';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  username: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Movie' })
  likedMovies: Movie[];

  @Prop({ default: DEFAULT_USER_AVATAR_URL })
  avatarPhoto: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Comment' })
  comments: string[];

  @Prop({ required: true, enum: ['user', 'admin'] })
  role: string
}

export const UserSchema = SchemaFactory.createForClass(User);
