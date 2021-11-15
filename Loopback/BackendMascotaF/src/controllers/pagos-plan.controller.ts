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
import {PagosPlan} from '../models';
import {PagosPlanRepository} from '../repositories';

export class PagosPlanController {
  constructor(
    @repository(PagosPlanRepository)
    public pagosPlanRepository : PagosPlanRepository,
  ) {}

  @post('/pagos-plans')
  @response(200, {
    description: 'PagosPlan model instance',
    content: {'application/json': {schema: getModelSchemaRef(PagosPlan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosPlan, {
            title: 'NewPagosPlan',
            exclude: ['id'],
          }),
        },
      },
    })
    pagosPlan: Omit<PagosPlan, 'id'>,
  ): Promise<PagosPlan> {
    return this.pagosPlanRepository.create(pagosPlan);
  }

  @get('/pagos-plans/count')
  @response(200, {
    description: 'PagosPlan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PagosPlan) where?: Where<PagosPlan>,
  ): Promise<Count> {
    return this.pagosPlanRepository.count(where);
  }

  @get('/pagos-plans')
  @response(200, {
    description: 'Array of PagosPlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PagosPlan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PagosPlan) filter?: Filter<PagosPlan>,
  ): Promise<PagosPlan[]> {
    return this.pagosPlanRepository.find(filter);
  }

  @patch('/pagos-plans')
  @response(200, {
    description: 'PagosPlan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosPlan, {partial: true}),
        },
      },
    })
    pagosPlan: PagosPlan,
    @param.where(PagosPlan) where?: Where<PagosPlan>,
  ): Promise<Count> {
    return this.pagosPlanRepository.updateAll(pagosPlan, where);
  }

  @get('/pagos-plans/{id}')
  @response(200, {
    description: 'PagosPlan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PagosPlan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PagosPlan, {exclude: 'where'}) filter?: FilterExcludingWhere<PagosPlan>
  ): Promise<PagosPlan> {
    return this.pagosPlanRepository.findById(id, filter);
  }

  @patch('/pagos-plans/{id}')
  @response(204, {
    description: 'PagosPlan PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosPlan, {partial: true}),
        },
      },
    })
    pagosPlan: PagosPlan,
  ): Promise<void> {
    await this.pagosPlanRepository.updateById(id, pagosPlan);
  }

  @put('/pagos-plans/{id}')
  @response(204, {
    description: 'PagosPlan PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pagosPlan: PagosPlan,
  ): Promise<void> {
    await this.pagosPlanRepository.replaceById(id, pagosPlan);
  }

  @del('/pagos-plans/{id}')
  @response(204, {
    description: 'PagosPlan DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pagosPlanRepository.deleteById(id);
  }
}
