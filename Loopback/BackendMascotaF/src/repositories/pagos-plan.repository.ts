import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PagosPlan, PagosPlanRelations} from '../models';

export class PagosPlanRepository extends DefaultCrudRepository<
  PagosPlan,
  typeof PagosPlan.prototype.id,
  PagosPlanRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PagosPlan, dataSource);
  }
}
