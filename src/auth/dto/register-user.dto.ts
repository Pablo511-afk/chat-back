import { IsEnum, IsString } from 'class-validator';
import { TypeEnum, TypeList } from 'src/enums/type.enum';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsString()
  user: string;

  @IsString()
  password: string;

  @IsEnum(TypeList, {
    message: `El tipo debe ser uno de los siguientes: ${TypeList}`,
  })
  type: TypeEnum;
}
