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
  Registro,
  Proveedor,
} from '../models';
import {RegistroRepository} from '../repositories';

export class RegistroProveedorController {
  constructor(
    @repository(RegistroRepository) protected registroRepository: RegistroRepository,
  ) { }

  @get('/registros/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Registro has one Proveedor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Proveedor),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Proveedor>,
  ): Promise<Proveedor> {
    return this.registroRepository.proveedor(id).get(filter);
  }

  @post('/registros/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Registro model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Registro.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedorInRegistro',
            exclude: ['id'],
            optional: ['registroId']
          }),
        },
      },
    }) proveedor: Omit<Proveedor, 'id'>,
  ): Promise<Proveedor> {
    return this.registroRepository.proveedor(id).create(proveedor);
  }

  @patch('/registros/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Registro.Proveedor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Partial<Proveedor>,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.registroRepository.proveedor(id).patch(proveedor, where);
  }

  @del('/registros/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Registro.Proveedor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.registroRepository.proveedor(id).delete(where);
  }
}
