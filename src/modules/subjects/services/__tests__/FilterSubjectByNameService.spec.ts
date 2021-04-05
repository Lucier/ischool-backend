import FakeSubjectsRepository from '@modules/subjects/repositories/fakes/FakeSubjectsRepository';

import CreateSubjectService from '../CreateSubjectService';
import FilterSubjectByNameService from '../FilterSubjectByNameService';

let fakeSubjectsRepository: FakeSubjectsRepository;
let createSubjectService: CreateSubjectService;
let filterSubjectByNameService: FilterSubjectByNameService;

describe('Filter Subject By Name', () => {
  beforeEach(() => {
    fakeSubjectsRepository = new FakeSubjectsRepository();
    createSubjectService = new CreateSubjectService(fakeSubjectsRepository);
    filterSubjectByNameService = new FilterSubjectByNameService(
      fakeSubjectsRepository,
    );
  });

  it('should be able to list all subjects that matchs the query', async () => {
    const subject1 = await createSubjectService.execute({
      name: 'Subject1',
    });

    const subject2 = await createSubjectService.execute({
      name: 'Subject2',
    });

    const filteredSubject1 = await filterSubjectByNameService.execute('1');
    const filteredSubject2 = await filterSubjectByNameService.execute('2');
    const filteredSubject3 = await filterSubjectByNameService.execute('Entre');

    expect(filteredSubject1).toEqual([subject1]);
    expect(filteredSubject2).toEqual([subject2]);
    expect(filteredSubject3).toEqual([subject1, subject2]);
  });
});
