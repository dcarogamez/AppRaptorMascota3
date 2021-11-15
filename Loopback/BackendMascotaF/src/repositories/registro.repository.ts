import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Registro, RegistroRelations, Empleado, Cliente, Mascota, Proveedor} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {ClienteRepository} from './cliente.repository';
import {MascotaRepository} from './mascota.repository';
import {ProveedorRepository} from './proveedor.repository';

export class RegistroRepository extends DefaultCrudRepository<
  Registro,
  typeof Registro.prototype.id,
  RegistroRelations
> {

  public readonly empleado: HasOneRepositoryFactory<Empleado, typeof Registro.prototype.id>;

  public readonly cliente: HasOneRepositoryFactory<Cliente, typeof Registro.prototype.id>;

  public readonly mascota: HasOneRepositoryFactory<Mascota, typeof Registro.prototype.id>;

  public readonly proveedor: HasOneRepositoryFactory<Proveedor, typeof Registro.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Registro, dataSource);
    this.proveedor = this.createHasOneRepositoryFactoryFor('proveedor', proveedorRepositoryGetter);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
    this.mascota = this.createHasOneRepositoryFactoryFor('mascota', mascotaRepositoryGetter);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.cliente = this.createHasOneRepositoryFactoryFor('cliente', clienteRepositoryGetter);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.empleado = this.createHasOneRepositoryFactoryFor('empleado', empleadoRepositoryGetter);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
  }
}
