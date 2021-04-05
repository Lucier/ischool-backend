import FakeSubjectsRepository from '@modules/subjects/repositories/fakes/FakeSubjectsRepository';
import { AppError } from '@shared/errors/AppError';

import ShowSubjectService from '../ShowSubjectService';

let fakeSubjectsRepository: FakeSubjectsRepository;
let showSubjectService: ShowSubjectService;

describe('Show Subject', () => {
  beforeEach(() => {
    fakeSubjectsRepository = new FakeSubjectsRepository();
    showSubjectService = new ShowSubjectService(fakeSubjectsRepository);
  });

  it('should be able to show the subject', async () => {
    const subject = await fakeSubjectsRepository.create({
      name: 'Banco de dados',
    });

    const profile = await showSubjectService.execute({
      subject_id: subject.id,
    });

    expect(profile.name).toBe('Banco de dados');
  });

  it('should not be able to show the subject from non-existing subject', async () => {
    await expect(
      showSubjectService.execute({
        subject_id: 'non-existing-subject-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
