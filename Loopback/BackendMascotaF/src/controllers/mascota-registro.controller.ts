import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mascota,
  Registro,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaRegistroController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/registro', {
    responses: {
      '200': {
        description: 'Mascota has one Registro',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Registro),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Registro>,
  ): Promise<Registro> {
    return this.mascotaRepository.registro(id).get(filter);
  }

  @post('/mascotas/{id}/registro', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Registro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Registro, {
            title: 'NewRegistroInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) registro: Omit<Registro, 'id'>,
  ): Promise<Registro> {
    return this.mascotaRepository.registro(id).create(registro);
  }

  @patch('/mascotas/{id}/registro', {
    responses: {
      '200': {
        description: 'Mascota.Registro PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Registro, {partial: true}),
        },
      },
    })
    registro: Partial<Registro>,
    @param.query.object('where', getWhereSchemaFor(Registro)) where?: Where<Registro>,
  ): Promise<Count> {
    return this.mascotaRepository.registro(id).patch(registro, where);
  }

  @del('/mascotas/{id}/registro', {
    responses: {
      '200': {
        description: 'Mascota.Registro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Registro)) where?: Where<Registro>,
  ): Promise<Count> {
    return this.mascotaRepository.registro(id).delete(where);
  }
}
