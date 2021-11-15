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
  Cliente,
  Registro,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteRegistroController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/registro', {
    responses: {
      '200': {
        description: 'Cliente has one Registro',
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
    return this.clienteRepository.registro(id).get(filter);
  }

  @post('/clientes/{id}/registro', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Registro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Registro, {
            title: 'NewRegistroInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) registro: Omit<Registro, 'id'>,
  ): Promise<Registro> {
    return this.clienteRepository.registro(id).create(registro);
  }

  @patch('/clientes/{id}/registro', {
    responses: {
      '200': {
        description: 'Cliente.Registro PATCH success count',
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
    return this.clienteRepository.registro(id).patch(registro, where);
  }

  @del('/clientes/{id}/registro', {
    responses: {
      '200': {
        description: 'Cliente.Registro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Registro)) where?: Where<Registro>,
  ): Promise<Count> {
    return this.clienteRepository.registro(id).delete(where);
  }
}
