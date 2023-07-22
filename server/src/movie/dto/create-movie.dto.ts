import { IsNotEmpty } from "class-validator"

export class CreateMovieDto {

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  desc: string

  @IsNotEmpty()
  category: string

  @IsNotEmpty()
  language: string

  @IsNotEmpty()
  year: string

  @IsNotEmpty()
  time: string
}
