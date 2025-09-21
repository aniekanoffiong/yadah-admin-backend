import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

class TwoFactorDto {
  @IsNumberString()
  @IsNotEmpty()
  @Length(6, 6)
  code!: string;
}

export default TwoFactorDto;
