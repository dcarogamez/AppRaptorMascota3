import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {ConsultaServ} from './consulta-serv.model';
import {ProductoServicio} from './producto-servicio.model';
import {DetallePedido} from './detalle-pedido.model';

@model()
export class Proveedor extends Entity {
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
  clave: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  consultaServId: string;

  @property({
    type: 'string',
    required: true,
  })
  contacto: string;

  @property({
    type: 'string',
  })
  telefono1?: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono2: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  ubicacion: string;

  @property({
    type: 'string',
  })
  registroId?: string;

   @hasMany(() => ConsultaServ)
  consultaServs: ConsultaServ[];

  @hasMany(() => ProductoServicio, {through: {model: () => DetallePedido}})
  productoServicios: ProductoServicio[];

  constructor(data?: Partial<Proveedor>) {
    super(data);
  }
}

export interface ProveedorRelations {
  // describe navigational properties here
}

export type ProveedorWithRelations = Proveedor & ProveedorRelations;
