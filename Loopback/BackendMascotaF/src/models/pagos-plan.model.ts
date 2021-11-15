import {Entity, model, property} from '@loopback/repository';

@model()
export class PagosPlan extends Entity {
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
  idPlan: string;

  @property({
    type: 'string',
    required: true,
  })
  idMascota: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;


  constructor(data?: Partial<PagosPlan>) {
    super(data);
  }
}

export interface PagosPlanRelations {
  // describe navigational properties here
}

export type PagosPlanWithRelations = PagosPlan & PagosPlanRelations;
