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
DetallePedido,
Pedido,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoPedidoController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Pedido through DetallePedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return this.empleadoRepository.pedidos(id).find(filter);
  }

  @post('/empleados/{id}/pedidos', {
    responses: {
      '200': {
        description: 'create a Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedidoInEmpleado',
            exclude: ['id'],
          }),
        },
      },
    }) pedido: Omit<Pedido, 'id'>,
  ): Promise<Pedido> {
    return this.empleadoRepository.pedidos(id).create(pedido);
  }

  @patch('/empleados/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Empleado.Pedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Partial<Pedido>,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.empleadoRepository.pedidos(id).patch(pedido, where);
  }

  @del('/empleados/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Empleado.Pedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.empleadoRepository.pedidos(id).delete(where);
  }
}
