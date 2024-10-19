import { IsString, IsNotEmpty, IsObject, IsDateString } from 'class-validator';

export class CrearAgendamientoDTO {

  @IsString()
  @IsNotEmpty({ message: 'El idAgenda no puede estar vacío' })
  idAgenda: string;

  @IsString()
  @IsNotEmpty({ message: 'El idCliente no puede estar vacío' })
  idCliente: string;

  @IsString()
  @IsNotEmpty({ message: 'El idProfesional no puede estar vacío' })
  idProfesional: string;

  @IsString()
  @IsNotEmpty({ message: 'El idServicioProfesional no puede estar vacío' })
  idServicioProfesional: string;

  @IsString()
  @IsNotEmpty({ message: 'El idLocal no puede estar vacío' })
  idLocal: string;

  @IsString()
  @IsNotEmpty({ message: 'El tipo no puede estar vacío' })
  tipo: string;

  @IsString()
  @IsNotEmpty({ message: 'La nota no puede estar vacía' })
  nota: string;

  @IsObject()
  @IsNotEmpty({ message: 'La nota no puede estar vacía' })
  encuentro: object;

  @IsDateString()
  @IsNotEmpty({ message: 'El agendamientoInicio no puede estar vacío' })
  agendamientoInicio: string;

  @IsDateString()
  @IsNotEmpty({ message: 'El agendamientoFin no puede estar vacío' })
  agendamientoFin: string;

  constructor (dto: any) {
    this.idAgenda = dto.idAgenda;
    this.idCliente = dto.idCliente;
    this.idProfesional = dto.idProfesional;
    this.idServicioProfesional = dto.idServicioProfesional;
    this.idLocal = dto.idLocal;
    this.tipo = dto.tipo;
    this.nota = dto.nota;
    this.encuentro = dto.encuentro;
    this.agendamientoInicio = dto.agendamientoInicio;
    this.agendamientoFin = dto.agendamientoFin;
  }

  toObject () {
    return {
      idAgenda: this.idAgenda,
      idCliente: this.idCliente,
      idProfesional: this.idProfesional,
      idServicioProfesional: this.idServicioProfesional,
      idLocal: this.idLocal,
      tipo: this.tipo,
      nota: this.nota,
      encuentro: this.encuentro,
      agendamientoInicio: this.agendamientoInicio,
      agendamientoFin: this.agendamientoFin,
    };
  }
}