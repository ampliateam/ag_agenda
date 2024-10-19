import { IsString, IsNotEmpty } from 'class-validator';

export class CrearAgendaDTO {
  @IsString()
  @IsNotEmpty({ message: 'El idProfesional no puede estar vacío' })
  idProfesional: string;

  constructor (dto: any) {
    this.idProfesional = dto.idProfesional;
  }

  toObject () {
    return {
      idProfesional: this.idProfesional,
    };
  }
}