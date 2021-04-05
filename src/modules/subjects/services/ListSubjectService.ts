import { inject, injectable } from 'tsyringe';

import Subject from '../infra/typeorm/entities/Subject';
import ISubjectsRepository from '../repositories/ISubjectsRepository';

@injectable()
class ListSubjectService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}

  public async execute(): Promise<Subject[]> {
    const subjects = await this.subjectsRepository.findAll();

    return subjects;
  }
}

export default ListSubjectService;
