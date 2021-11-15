import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Registro, Pedido, DetallePedido} from '../models';
import {RegistroRepository} from './registro.repository';
import {DetallePedidoRepository} from './detalle-pedido.repository';
import {PedidoRepository} from './pedido.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly registro: HasOneRepositoryFactory<Registro, typeof Empleado.prototype.id>;

  public readonly pedidos: HasManyThroughRepositoryFactory<Pedido, typeof Pedido.prototype.id,
          DetallePedido,
          typeof Empleado.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RegistroRepository') protected registroRepositoryGetter: Getter<RegistroRepository>, @repository.getter('DetallePedidoRepository') protected detallePedidoRepositoryGetter: Getter<DetallePedidoRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Empleado, dataSource);
    this.pedidos = this.createHasManyThroughRepositoryFactoryFor('pedidos', pedidoRepositoryGetter, detallePedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.registro = this.createHasOneRepositoryFactoryFor('registro', registroRepositoryGetter);
    this.registerInclusionResolver('registro', this.registro.inclusionResolver);
  }
}
