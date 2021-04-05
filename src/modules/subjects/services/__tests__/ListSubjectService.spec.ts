import FakeSubjectsRepository from '@modules/subjects/repositories/fakes/FakeSubjectsRepository';

import CreateSubjectService from '../CreateSubjectService';
import ListSubjectByIdService from '../ListSubjectByIdService';

let createSubjectService: CreateSubjectService;
let listSubjectByIdService: ListSubjectByIdService;
let fakeSubjectsRepository: FakeSubjectsRepository;

describe('List Subjects By Id', () => {
  beforeEach(() => {
    fakeSubjectsRepository = new FakeSubjectsRepository();

    createSubjectService = new CreateSubjectService(fakeSubjectsRepository);
    listSubjectByIdService = new ListSubjectByIdService(fakeSubjectsRepository);
  });

  it('should be able to list the subject', async () => {
    const subject1 = await createSubjectService.execute({
      name: 'Português',
    });

    const justOneSubject = await listSubjectByIdService.execute(subject1.id);

    expect(justOneSubject).toEqual(subject1);
  });
});
