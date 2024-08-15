import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  video: any | null;
  cover_image: any | null;
}
