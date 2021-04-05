import { inject, injectable } from 'tsyringe';

import ISubjectsRepository from '../repositories/ISubjectsRepository';

@injectable()
class DeleteSubjectService {
  constructor(
    @inject('SubjectsRepository')
    private subjectsRepository: ISubjectsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.subjectsRepository.deleteById(id);
  }
}

export default DeleteSubjectService;
