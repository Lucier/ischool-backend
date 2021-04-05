import { container } from 'tsyringe';

import SubjectsRepository from '@modules/subjects/infra/typeorm/repositories/SubjectsRepository';
import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';

container.registerSingleton<ISubjectsRepository>(
  'SubjectsRepository',
  SubjectsRepository,
);
