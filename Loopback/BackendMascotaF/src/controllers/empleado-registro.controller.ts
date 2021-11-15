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
  Empleado,
  Registro,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoRegistroController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/registro', {
    responses: {
      '200': {
        description: 'Empleado has one Registro',
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
    return this.empleadoRepository.registro(id).get(filter);
  }

  @post('/empleados/{id}/registro', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Registro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Registro, {
            title: 'NewRegistroInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) registro: Omit<Registro, 'id'>,
  ): Promise<Registro> {
    return this.empleadoRepository.registro(id).create(registro);
  }

  @patch('/empleados/{id}/registro', {
    responses: {
      '200': {
        description: 'Empleado.Registro PATCH success count',
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
    return this.empleadoRepository.registro(id).patch(registro, where);
  }

  @del('/empleados/{id}/registro', {
    responses: {
      '200': {
        description: 'Empleado.Registro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Registro)) where?: Where<Registro>,
  ): Promise<Count> {
    return this.empleadoRepository.registro(id).delete(where);
  }
}
