import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  year: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true, default: "" })
  videoUrl: string;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  reviews: number;

  @Prop({ required: true })
  previewFileName: string

  @Prop({ required: true })
  movieFileName: string
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
