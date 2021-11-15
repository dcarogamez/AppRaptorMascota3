import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Registro, ConsultaServ} from '../models';
import {RegistroRepository} from './registro.repository';
import {ConsultaServRepository} from './consulta-serv.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly registro: HasOneRepositoryFactory<Registro, typeof Mascota.prototype.id>;

  public readonly consultaServs: HasManyRepositoryFactory<ConsultaServ, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RegistroRepository') protected registroRepositoryGetter: Getter<RegistroRepository>, @repository.getter('ConsultaServRepository') protected consultaServRepositoryGetter: Getter<ConsultaServRepository>,
  ) {
    super(Mascota, dataSource);
    this.consultaServs = this.createHasManyRepositoryFactoryFor('consultaServs', consultaServRepositoryGetter,);
    this.registerInclusionResolver('consultaServs', this.consultaServs.inclusionResolver);
    this.registro = this.createHasOneRepositoryFactoryFor('registro', registroRepositoryGetter);
    this.registerInclusionResolver('registro', this.registro.inclusionResolver);
  }
}
