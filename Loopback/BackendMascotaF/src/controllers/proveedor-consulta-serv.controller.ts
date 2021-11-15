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
  ConsultaServ,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorConsultaServController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/consulta-servs', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many ConsultaServ',
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
    return this.proveedorRepository.consultaServs(id).find(filter);
  }

  @post('/proveedors/{id}/consulta-servs', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(ConsultaServ)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConsultaServ, {
            title: 'NewConsultaServInProveedor',
            exclude: ['id'],
            optional: ['proveedorId']
          }),
        },
      },
    }) consultaServ: Omit<ConsultaServ, 'id'>,
  ): Promise<ConsultaServ> {
    return this.proveedorRepository.consultaServs(id).create(consultaServ);
  }

  @patch('/proveedors/{id}/consulta-servs', {
    responses: {
      '200': {
        description: 'Proveedor.ConsultaServ PATCH success count',
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
    return this.proveedorRepository.consultaServs(id).patch(consultaServ, where);
  }

  @del('/proveedors/{id}/consulta-servs', {
    responses: {
      '200': {
        description: 'Proveedor.ConsultaServ DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ConsultaServ)) where?: Where<ConsultaServ>,
  ): Promise<Count> {
    return this.proveedorRepository.consultaServs(id).delete(where);
  }
}
