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
import {ConsultaServ} from '../models';
import {ConsultaServRepository} from '../repositories';

export class ConsultaServController {
  constructor(
    @repository(ConsultaServRepository)
    public consultaServRepository : ConsultaServRepository,
  ) {}

  @post('/consulta-servs')
  @response(200, {
    description: 'ConsultaServ model instance',
    content: {'application/json': {schema: getModelSchemaRef(ConsultaServ)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaServ, {
            title: 'NewConsultaServ',
            exclude: ['id'],
          }),
        },
      },
    })
    consultaServ: Omit<ConsultaServ, 'id'>,
  ): Promise<ConsultaServ> {
    return this.consultaServRepository.create(consultaServ);
  }

  @get('/consulta-servs/count')
  @response(200, {
    description: 'ConsultaServ model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ConsultaServ) where?: Where<ConsultaServ>,
  ): Promise<Count> {
    return this.consultaServRepository.count(where);
  }

  @get('/consulta-servs')
  @response(200, {
    description: 'Array of ConsultaServ model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ConsultaServ, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ConsultaServ) filter?: Filter<ConsultaServ>,
  ): Promise<ConsultaServ[]> {
    return this.consultaServRepository.find(filter);
  }

  @patch('/consulta-servs')
  @response(200, {
    description: 'ConsultaServ PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaServ, {partial: true}),
        },
      },
    })
    consultaServ: ConsultaServ,
    @param.where(ConsultaServ) where?: Where<ConsultaServ>,
  ): Promise<Count> {
    return this.consultaServRepository.updateAll(consultaServ, where);
  }

  @get('/consulta-servs/{id}')
  @response(200, {
    description: 'ConsultaServ model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ConsultaServ, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ConsultaServ, {exclude: 'where'}) filter?: FilterExcludingWhere<ConsultaServ>
  ): Promise<ConsultaServ> {
    return this.consultaServRepository.findById(id, filter);
  }

  @patch('/consulta-servs/{id}')
  @response(204, {
    description: 'ConsultaServ PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaServ, {partial: true}),
        },
      },
    })
    consultaServ: ConsultaServ,
  ): Promise<void> {
    await this.consultaServRepository.updateById(id, consultaServ);
  }

  @put('/consulta-servs/{id}')
  @response(204, {
    description: 'ConsultaServ PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() consultaServ: ConsultaServ,
  ): Promise<void> {
    await this.consultaServRepository.replaceById(id, consultaServ);
  }

  @del('/consulta-servs/{id}')
  @response(204, {
    description: 'ConsultaServ DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.consultaServRepository.deleteById(id);
  }
}
