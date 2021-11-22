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
import {Proveedor} from '../models';
import {ProveedorRepository} from '../repositories';
import { AutenticacionService } from '../services';
const fetch = require("node-fetch");

export class ProveedorController {
  constructor(
    @repository(ProveedorRepository)
    public proveedorRepository : ProveedorRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService 
  ) {}

  @post('/proveedors')
  @response(200, {
    description: 'Proveedor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedor',
            exclude: ['id'],
          }),
        },
      },
    })
    proveedor: Omit<Proveedor, 'id'>,
  ): Promise<Proveedor> {
    //return this.proveedorRepository.create(proveedor);
    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    proveedor.clave = claveCifrada;
    let p = await this.proveedorRepository.create(proveedor);

    // Notificar al usuario
    let destino = proveedor.correo;
    let asunto = 'Registro en la plataforma';
    let contenido = `Hola ${proveedor.nombre}, su usuario es ${proveedor.correo} y su contraseña es ${clave}`;
    fetch(`http://127.0.0.0:5000/envio-correo?correo_destino=${destino}&asunto`)


  }

  @get('/proveedors/count')
  @response(200, {
    description: 'Proveedor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Proveedor) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.proveedorRepository.count(where);
  }

  @get('/proveedors')
  @response(200, {
    description: 'Array of Proveedor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Proveedor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Proveedor) filter?: Filter<Proveedor>,
  ): Promise<Proveedor[]> {
    return this.proveedorRepository.find(filter);
  }

  @patch('/proveedors')
  @response(200, {
    description: 'Proveedor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Proveedor,
    @param.where(Proveedor) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.proveedorRepository.updateAll(proveedor, where);
  }

  @get('/proveedors/{id}')
  @response(200, {
    description: 'Proveedor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Proveedor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Proveedor, {exclude: 'where'}) filter?: FilterExcludingWhere<Proveedor>
  ): Promise<Proveedor> {
    return this.proveedorRepository.findById(id, filter);
  }

  @patch('/proveedors/{id}')
  @response(204, {
    description: 'Proveedor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Proveedor,
  ): Promise<void> {
    await this.proveedorRepository.updateById(id, proveedor);
  }

  @put('/proveedors/{id}')
  @response(204, {
    description: 'Proveedor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() proveedor: Proveedor,
  ): Promise<void> {
    await this.proveedorRepository.replaceById(id, proveedor);
  }

  @del('/proveedors/{id}')
  @response(204, {
    description: 'Proveedor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.proveedorRepository.deleteById(id);
  }
}
