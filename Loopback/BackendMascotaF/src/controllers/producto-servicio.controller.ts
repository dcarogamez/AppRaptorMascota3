import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ProductoServicio} from '../models';
import {ProductoServicioRepository} from '../repositories';

export class ProductoServicioController {
  constructor(
    @repository(ProductoServicioRepository)
    public productoServicioRepository : ProductoServicioRepository,
  ) {}

  @post('/producto-servicios')
  @response(200, {
    description: 'ProductoServicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductoServicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoServicio, {
            title: 'NewProductoServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    productoServicio: Omit<ProductoServicio, 'id'>,
  ): Promise<ProductoServicio> {
    return this.productoServicioRepository.create(productoServicio);
  }

  @get('/producto-servicios/count')
  @response(200, {
    description: 'ProductoServicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductoServicio) where?: Where<ProductoServicio>,
  ): Promise<Count> {
    return this.productoServicioRepository.count(where);
  }

  @get('/producto-servicios')
  @response(200, {
    description: 'Array of ProductoServicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductoServicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductoServicio) filter?: Filter<ProductoServicio>,
  ): Promise<ProductoServicio[]> {
    return this.productoServicioRepository.find(filter);
  }

  @patch('/producto-servicios')
  @response(200, {
    description: 'ProductoServicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoServicio, {partial: true}),
        },
      },
    })
    productoServicio: ProductoServicio,
    @param.where(ProductoServicio) where?: Where<ProductoServicio>,
  ): Promise<Count> {
    return this.productoServicioRepository.updateAll(productoServicio, where);
  }

  @get('/producto-servicios/{id}')
  @response(200, {
    description: 'ProductoServicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductoServicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductoServicio, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductoServicio>
  ): Promise<ProductoServicio> {
    return this.productoServicioRepository.findById(id, filter);
  }

  @patch('/producto-servicios/{id}')
  @response(204, {
    description: 'ProductoServicio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoServicio, {partial: true}),
        },
      },
    })
    productoServicio: ProductoServicio,
  ): Promise<void> {
    await this.productoServicioRepository.updateById(id, productoServicio);
  }

  @put('/producto-servicios/{id}')
  @response(204, {
    description: 'ProductoServicio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productoServicio: ProductoServicio,
  ): Promise<void> {
    await this.productoServicioRepository.replaceById(id, productoServicio);
  }

  @del('/producto-servicios/{id}')
  @response(204, {
    description: 'ProductoServicio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productoServicioRepository.deleteById(id);
  }
}
