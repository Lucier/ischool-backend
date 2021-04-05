import FakeSubjectsRepository from '@modules/subjects/repositories/fakes/FakeSubjectsRepository';
import { AppError } from '@shared/errors/AppError';

import CreateSubjectService from '../CreateSubjectService';

let fakeSubjectsRepository: FakeSubjectsRepository;
let createSubjectService: CreateSubjectService;

describe('Create Subject', () => {
  beforeEach(() => {
    fakeSubjectsRepository = new FakeSubjectsRepository();

    createSubjectService = new CreateSubjectService(fakeSubjectsRepository);
  });

  it('should be able to create a new subject', async () => {
    const subject = await createSubjectService.execute({
      name: 'Sistemas Operacionais',
    });

    expect(subject).toHaveProperty('id');
  });

  it('should not be ale to create a new subject whith same name from another', async () => {
    await createSubjectService.execute({
      name: 'Banco de dados',
    });

    await expect(
      createSubjectService.execute({
        name: 'Banco de dados',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
