import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import ICreateSubjectDTO from '../dtos/ICreateSubjectDTO';
import Subject from '../infra/typeorm/entities/Subject';
import ISubjectsRepository from '../repositories/ISubjectsRepository';

@injectable()
class CreateSubjectService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}

  public async execute({ name }: ICreateSubjectDTO): Promise<Subject> {
    const checkSubjectExists = await this.subjectsRepository.findByName(name);

    if (checkSubjectExists) {
      throw new AppError(
        'Já existe uma disciplina cadastrada com o nome informado.',
      );
    }

    const subject = await this.subjectsRepository.create({ name });

    return subject;
  }
}

export default CreateSubjectService;
