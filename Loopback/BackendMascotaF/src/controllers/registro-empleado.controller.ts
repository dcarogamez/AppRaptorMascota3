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
  Empleado,
} from '../models';
import {RegistroRepository} from '../repositories';

export class RegistroEmpleadoController {
  constructor(
    @repository(RegistroRepository) protected registroRepository: RegistroRepository,
  ) { }

  @get('/registros/{id}/empleado', {
    responses: {
      '200': {
        description: 'Registro has one Empleado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Empleado),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado> {
    return this.registroRepository.empleado(id).get(filter);
  }

  @post('/registros/{id}/empleado', {
    responses: {
      '200': {
        description: 'Registro model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Registro.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInRegistro',
            exclude: ['id'],
            optional: ['registroId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.registroRepository.empleado(id).create(empleado);
  }

  @patch('/registros/{id}/empleado', {
    responses: {
      '200': {
        description: 'Registro.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.registroRepository.empleado(id).patch(empleado, where);
  }

  @del('/registros/{id}/empleado', {
    responses: {
      '200': {
        description: 'Registro.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.registroRepository.empleado(id).delete(where);
  }
}
