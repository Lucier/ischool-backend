import ICreateSubjectDTO from '../dtos/ICreateSubjectDTO';
import Subject from '../infra/typeorm/entities/Subject';

export default interface ISubjectsRepository {
  findAll(): Promise<Subject[]>;
  findByName(name: string): Promise<Subject | undefined>;
  filterByName(name: string): Promise<Subject[] | undefined>;
  findById(id: string): Promise<Subject | undefined>;
  create(data: ICreateSubjectDTO): Promise<Subject>;
  save(subject: Subject): Promise<Subject>;
  deleteById(id: string): Promise<void>;
}
