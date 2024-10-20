import { IsString, IsNotEmpty } from 'class-validator';

export class CrearCALDTO {

  @IsString()
  @IsNotEmpty({ message: 'El idAgenda no puede estar vacío' })
  idAgenda: string;

  @IsString()
  @IsNotEmpty({ message: 'El idLocal no puede estar vacío' })
  idLocal: string;

  constructor (dto: any) {
    this.idAgenda = dto.idAgenda
    this.idLocal = dto.idLocal
  }

  toObject () {
    return {
      idAgenda: this.idAgenda,
      idLocal: this.idLocal
    };
  }
}