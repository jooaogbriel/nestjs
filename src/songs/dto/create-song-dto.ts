import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  readonly artists;

  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;

  @IsString()
  @IsNotEmpty()
  readonly lyrics: string;
}
