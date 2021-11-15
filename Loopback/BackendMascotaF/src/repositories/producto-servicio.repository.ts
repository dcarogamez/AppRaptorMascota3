import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProductoServicio, ProductoServicioRelations} from '../models';

export class ProductoServicioRepository extends DefaultCrudRepository<
  ProductoServicio,
  typeof ProductoServicio.prototype.id,
  ProductoServicioRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ProductoServicio, dataSource);
  }
}
