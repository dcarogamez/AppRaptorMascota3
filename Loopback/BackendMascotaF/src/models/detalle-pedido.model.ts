import {Entity, model, property} from '@loopback/repository';

@model()
export class DetallePedido extends Entity {

  @property({
    type: 'string',
    required: true,
  })
  id: string;


  @property({
    type: 'string',
    required: true,
  })
  idPedido: string;

  @property({
    type: 'string',
    required: true,
  })
  idProducto_servicio: string;


  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
  })
  empleadoId?: string;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @property({
    type: 'string',
  })
  proveedorId?: string;

  @property({
    type: 'string',
  })
  productoServicioId?: string;

  constructor(data?: Partial<DetallePedido>) {
    super(data);
  }
}

export interface DetallePedidoRelations {
  // describe navigational properties here
}

export type DetallePedidoWithRelations = DetallePedido & DetallePedidoRelations;
