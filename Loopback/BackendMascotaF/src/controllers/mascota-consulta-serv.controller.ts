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
  ConsultaServ,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaConsultaServController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/consulta-servs', {
    responses: {
      '200': {
        description: 'Array of Mascota has many ConsultaServ',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ConsultaServ)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ConsultaServ>,
  ): Promise<ConsultaServ[]> {
    return this.mascotaRepository.consultaServs(id).find(filter);
  }

  @post('/mascotas/{id}/consulta-servs', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(ConsultaServ)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaServ, {
            title: 'NewConsultaServInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) consultaServ: Omit<ConsultaServ, 'id'>,
  ): Promise<ConsultaServ> {
    return this.mascotaRepository.consultaServs(id).create(consultaServ);
  }

  @patch('/mascotas/{id}/consulta-servs', {
    responses: {
      '200': {
        description: 'Mascota.ConsultaServ PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaServ, {partial: true}),
        },
      },
    })
    consultaServ: Partial<ConsultaServ>,
    @param.query.object('where', getWhereSchemaFor(ConsultaServ)) where?: Where<ConsultaServ>,
  ): Promise<Count> {
    return this.mascotaRepository.consultaServs(id).patch(consultaServ, where);
  }

  @del('/mascotas/{id}/consulta-servs', {
    responses: {
      '200': {
        description: 'Mascota.ConsultaServ DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ConsultaServ)) where?: Where<ConsultaServ>,
  ): Promise<Count> {
    return this.mascotaRepository.consultaServs(id).delete(where);
  }
}
