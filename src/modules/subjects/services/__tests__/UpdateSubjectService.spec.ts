import FakeSubjectsRepository from '@modules/subjects/repositories/fakes/FakeSubjectsRepository';
import { AppError } from '@shared/errors/AppError';

import CreateSubjectService from '../CreateSubjectService';
import UpdateSubjectService from '../UpdateSubjectService';

let fakeSubjectsRepository: FakeSubjectsRepository;
let createSubjectService: CreateSubjectService;
let updateSubjectService: UpdateSubjectService;

describe('Update Subject', () => {
  beforeEach(() => {
    fakeSubjectsRepository = new FakeSubjectsRepository();

    createSubjectService = new CreateSubjectService(fakeSubjectsRepository);
    updateSubjectService = new UpdateSubjectService(fakeSubjectsRepository);
  });

  it('should be able to update the subject', async () => {
    const subject = await createSubjectService.execute({
      name: 'Programação de Computadores I',
    });

    const updatedSubject = await createSubjectService.execute({
      id: subject.id,
      name: 'Programação de Computadores II',
    });

    expect(updatedSubject.name).toBe('Programação de Computadores II');
  });

  it('should not be able to update the profile from non-existing subject', async () => {
    await expect(
      updateSubjectService.execute({
        id: 'non-existing-subject-id',
        name: 'Programação de computadores I',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
