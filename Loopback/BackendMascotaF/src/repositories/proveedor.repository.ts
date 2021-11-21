import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, ConsultaServ, ProductoServicio, DetallePedido} from '../models';

import {ConsultaServRepository} from './consulta-serv.repository';
import {DetallePedidoRepository} from './detalle-pedido.repository';
import {ProductoServicioRepository} from './producto-servicio.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id,
  ProveedorRelations
> {

  
  public readonly consultaServs: HasManyRepositoryFactory<ConsultaServ, typeof Proveedor.prototype.id>;

  public readonly productoServicios: HasManyThroughRepositoryFactory<ProductoServicio, typeof ProductoServicio.prototype.id,
          DetallePedido,
          typeof Proveedor.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ConsultaServRepository') protected consultaServRepositoryGetter: Getter<ConsultaServRepository>, @repository.getter('DetallePedidoRepository') protected detallePedidoRepositoryGetter: Getter<DetallePedidoRepository>, @repository.getter('ProductoServicioRepository') protected productoServicioRepositoryGetter: Getter<ProductoServicioRepository>,
  ) {
    super(Proveedor, dataSource);
    this.productoServicios = this.createHasManyThroughRepositoryFactoryFor('productoServicios', productoServicioRepositoryGetter, detallePedidoRepositoryGetter,);
    this.registerInclusionResolver('productoServicios', this.productoServicios.inclusionResolver);
    this.consultaServs = this.createHasManyRepositoryFactoryFor('consultaServs', consultaServRepositoryGetter,);
    this.registerInclusionResolver('consultaServs', this.consultaServs.inclusionResolver);
     }
}
