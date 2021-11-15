import {Entity, model, property} from '@loopback/repository';

@model()
export class ConsultaServ extends Entity {
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
  mascotaId: string;

  @property({
    type: 'string',
    required: true,
  })
  proveedorId: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaConsulta: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;



  constructor(data?: Partial<ConsultaServ>) {
    super(data);
  }
}

export interface ConsultaServRelations {
  // describe navigational properties here
}

export type ConsultaServWithRelations = ConsultaServ & ConsultaServRelations;
