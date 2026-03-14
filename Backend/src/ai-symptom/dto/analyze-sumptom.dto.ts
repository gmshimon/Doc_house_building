import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class AnalyzeSymptomDto {
  @IsString()
  @Length(1, 2000)
  symptomText: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  @IsString()
  gender: string;

  @IsString()
  duration: string;
}
