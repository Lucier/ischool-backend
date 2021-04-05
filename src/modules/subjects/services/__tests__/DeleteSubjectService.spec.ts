import FakeSubjectsRepository from '@modules/subjects/repositories/fakes/FakeSubjectsRepository';

import CreateSubjectService from '../CreateSubjectService';
import DeleteSubjectService from '../DeleteSubjectService';
import ListSubjectService from '../ListSubjectService';

let fakeSubjectsRepository: FakeSubjectsRepository;
let createSubjectService: CreateSubjectService;
let deleteSubjectService: DeleteSubjectService;
let listSubjectService: ListSubjectService;

describe('Delete Subject', () => {
  beforeEach(() => {
    fakeSubjectsRepository = new FakeSubjectsRepository();

    createSubjectService = new CreateSubjectService(fakeSubjectsRepository);
    deleteSubjectService = new DeleteSubjectService(fakeSubjectsRepository);
    listSubjectService = new ListSubjectService(fakeSubjectsRepository);
  });

  it('should be able to delete a subject', async () => {
    const subject = await createSubjectService.execute({
      name: 'Sistemas Operacionais',
    });

    const subject2 = await createSubjectService.execute({
      name: 'Banco de dados',
    });

    await deleteSubjectService.execute(subject.id);

    const listOfSubjects = await listSubjectService.execute();

    expect(listOfSubjects).toEqual([subject2]);
  });
});
