import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Registro} from './registro.model';
import {Pedido} from './pedido.model';
import {DetallePedido} from './detalle-pedido.model';

@model()
export class Empleado extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  documentoId: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'string',
    required: true,
  })
  cargo: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'boolean',
    required: true,
  })
  comision: boolean;

  @property({
    type: 'string',
    required: true,
  })
  nivel: string;

  @property({
    type: 'string',
    required: true,
  })
  pedidoId: string;

  @property({
    type: 'string',
  })
  registroId?: string;

  @hasOne(() => Registro)
  registro: Registro;

  @hasMany(() => Pedido, {through: {model: () => DetallePedido}})
  pedidos: Pedido[];

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
