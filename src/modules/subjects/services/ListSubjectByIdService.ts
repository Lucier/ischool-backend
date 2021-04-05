import { injectable, inject } from 'tsyringe';

import Subject from '../infra/typeorm/entities/Subject';
import ISubjectsRepository from '../repositories/ISubjectsRepository';

@injectable()
class ListSubjectByIdService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}

  public async execute(id: string): Promise<Subject | undefined> {
    const subject = await this.subjectsRepository.findById(id);

    return subject;
  }
}

export default ListSubjectByIdService;
