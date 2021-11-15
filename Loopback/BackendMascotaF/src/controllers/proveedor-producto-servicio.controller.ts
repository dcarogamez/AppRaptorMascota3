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
Proveedor,
DetallePedido,
ProductoServicio,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorProductoServicioController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/producto-servicios', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many ProductoServicio through DetallePedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProductoServicio>,
  ): Promise<ProductoServicio[]> {
    return this.proveedorRepository.productoServicios(id).find(filter);
  }

  @post('/proveedors/{id}/producto-servicios', {
    responses: {
      '200': {
        description: 'create a ProductoServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductoServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoServicio, {
            title: 'NewProductoServicioInProveedor',
            exclude: ['id'],
          }),
        },
      },
    }) productoServicio: Omit<ProductoServicio, 'id'>,
  ): Promise<ProductoServicio> {
    return this.proveedorRepository.productoServicios(id).create(productoServicio);
  }

  @patch('/proveedors/{id}/producto-servicios', {
    responses: {
      '200': {
        description: 'Proveedor.ProductoServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoServicio, {partial: true}),
        },
      },
    })
    productoServicio: Partial<ProductoServicio>,
    @param.query.object('where', getWhereSchemaFor(ProductoServicio)) where?: Where<ProductoServicio>,
  ): Promise<Count> {
    return this.proveedorRepository.productoServicios(id).patch(productoServicio, where);
  }

  @del('/proveedors/{id}/producto-servicios', {
    responses: {
      '200': {
        description: 'Proveedor.ProductoServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductoServicio)) where?: Where<ProductoServicio>,
  ): Promise<Count> {
    return this.proveedorRepository.productoServicios(id).delete(where);
  }
}
