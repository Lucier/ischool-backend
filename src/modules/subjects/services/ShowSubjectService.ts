import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import Subject from '../infra/typeorm/entities/Subject';
import ISubjectsRepository from '../repositories/ISubjectsRepository';

interface IRequest {
  subject_id: string;
}

@injectable()
class ShowSubjectService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}

  public async execute({ subject_id }: IRequest): Promise<Subject> {
    const subject = await this.subjectsRepository.findById(subject_id);

    if (!subject) {
      throw new AppError('Disciplina não encontrada.');
    }

    return subject;
  }
}

export default ShowSubjectService;
