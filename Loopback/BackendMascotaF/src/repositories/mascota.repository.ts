import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, ConsultaServ} from '../models';

import {ConsultaServRepository} from './consulta-serv.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {


  public readonly consultaServs: HasManyRepositoryFactory<ConsultaServ, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ConsultaServRepository') protected consultaServRepositoryGetter: Getter<ConsultaServRepository>,
  ) {
    super(Mascota, dataSource);
    this.consultaServs = this.createHasManyRepositoryFactoryFor('consultaServs', consultaServRepositoryGetter,);
    this.registerInclusionResolver('consultaServs', this.consultaServs.inclusionResolver);
    
  }
}
