import { injectable, inject } from 'tsyringe';

import Subject from '../infra/typeorm/entities/Subject';
import ISubjectsRepository from '../repositories/ISubjectsRepository';

@injectable()
class FilterSubjectByNameService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}

  public async execute(name: string): Promise<Subject[] | undefined> {
    const subjects = await this.subjectsRepository.filterByName(name);

    return subjects;
  }
}

export default FilterSubjectByNameService;
