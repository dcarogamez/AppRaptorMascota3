import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ConsultaServ, ConsultaServRelations} from '../models';

export class ConsultaServRepository extends DefaultCrudRepository<
  ConsultaServ,
  typeof ConsultaServ.prototype.id,
  ConsultaServRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ConsultaServ, dataSource);
  }
}
