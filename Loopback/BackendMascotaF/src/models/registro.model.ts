import {Entity, model, property, hasOne} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {Cliente} from './cliente.model';
import {Mascota} from './mascota.model';
import {Proveedor} from './proveedor.model';

@model()
export class Registro extends Entity {
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
  mascotaId: string;

  @property({
    type: 'string',
    required: true,
  })
  empleadoId: string;

  @property({
    type: 'string',
    required: true,
  })
  clienteId: string;

  @property({
    type: 'string',
    required: true,
  })
  proveedorId: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @hasOne(() => Empleado)
  empleado: Empleado;

  @hasOne(() => Cliente)
  cliente: Cliente;

  @hasOne(() => Mascota)
  mascota: Mascota;

  @hasOne(() => Proveedor)
  proveedor: Proveedor;

  constructor(data?: Partial<Registro>) {
    super(data);
  }
}

export interface RegistroRelations {
  // describe navigational properties here
}

export type RegistroWithRelations = Registro & RegistroRelations;
