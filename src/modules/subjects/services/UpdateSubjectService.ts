import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import IUpdateSubjectDTO from '../dtos/IUpdateSubjectDTO';
import Subject from '../infra/typeorm/entities/Subject';
import ISubjectsRepository from '../repositories/ISubjectsRepository';

@injectable()
class UpdateSubjectService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}

  public async execute({ id, name }: IUpdateSubjectDTO): Promise<Subject> {
    const findSubject = await this.subjectsRepository.findById(id);

    if (!findSubject) {
      throw new AppError('Disciplina não encontrada.');
    }

    if (name) {
      findSubject.name = name;
    }

    this.subjectsRepository.save(findSubject);

    return findSubject;
  }
}

export default UpdateSubjectService;
