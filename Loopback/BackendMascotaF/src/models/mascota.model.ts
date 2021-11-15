import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Registro} from './registro.model';
import {ConsultaServ} from './consulta-serv.model';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  planId: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNaci: string;

  @property({
    type: 'string',
    required: true,
  })
  senales: string;

  @property({
    type: 'string',
    required: true,
  })
  alimento: string;

  @property({
    type: 'number',
    required: true,
  })
  peso: number;

  @property({
    type: 'string',
    required: true,
  })
  enfermedadesPrex: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  motivoStatus: string;

  @property({
    type: 'string',
  })
  registroId?: string;

  @hasOne(() => Registro)
  registro: Registro;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @hasMany(() => ConsultaServ)
  consultaServs: ConsultaServ[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
