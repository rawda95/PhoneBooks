import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Phonebooks} from '../models';
import {PhonebooksRepository} from '../repositories';

export class PhoneBooksController {
  constructor(
    @repository(PhonebooksRepository)
    public phonebooksRepository : PhonebooksRepository,
  ) {}

  @post('/phonebooks', {
    responses: {
      '200': {
        description: 'Phonebooks model instance',
        content: {'application/json': {schema: getModelSchemaRef(Phonebooks)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Phonebooks, {
            title: 'NewPhonebooks',
            exclude: ['id'],
          }),
        },
      },
    })
    phonebooks: Omit<Phonebooks, 'id'>,
  ): Promise<Phonebooks> {
    return this.phonebooksRepository.create(phonebooks);
  }

  @get('/phonebooks/count', {
    responses: {
      '200': {
        description: 'Phonebooks model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Phonebooks)) where?: Where<Phonebooks>,
  ): Promise<Count> {
    return this.phonebooksRepository.count(where);
  }

  @get('/phonebooks', {
    responses: {
      '200': {
        description: 'Array of Phonebooks model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Phonebooks, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Phonebooks)) filter?: Filter<Phonebooks>,
  ): Promise<Phonebooks[]> {
    return this.phonebooksRepository.find(filter);
  }

  @patch('/phonebooks', {
    responses: {
      '200': {
        description: 'Phonebooks PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Phonebooks, {partial: true}),
        },
      },
    })
    phonebooks: Phonebooks,
    @param.query.object('where', getWhereSchemaFor(Phonebooks)) where?: Where<Phonebooks>,
  ): Promise<Count> {
    return this.phonebooksRepository.updateAll(phonebooks, where);
  }

  @get('/phonebooks/{id}', {
    responses: {
      '200': {
        description: 'Phonebooks model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Phonebooks, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Phonebooks)) filter?: Filter<Phonebooks>
  ): Promise<Phonebooks> {
    return this.phonebooksRepository.findById(id, filter);
  }

  @patch('/phonebooks/{id}', {
    responses: {
      '204': {
        description: 'Phonebooks PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Phonebooks, {partial: true}),
        },
      },
    })
    phonebooks: Phonebooks,
  ): Promise<void> {
    await this.phonebooksRepository.updateById(id, phonebooks);
  }

  @put('/phonebooks/{id}', {
    responses: {
      '204': {
        description: 'Phonebooks PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() phonebooks: Phonebooks,
  ): Promise<void> {
    await this.phonebooksRepository.replaceById(id, phonebooks);
  }

  @del('/phonebooks/{id}', {
    responses: {
      '204': {
        description: 'Phonebooks DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.phonebooksRepository.deleteById(id);
  }
}
