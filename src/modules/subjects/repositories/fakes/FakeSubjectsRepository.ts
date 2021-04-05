import { uuid } from 'uuidv4';

import ICreateSubjectDTO from '@modules/subjects/dtos/ICreateSubjectDTO';
import Subject from '@modules/subjects/infra/typeorm/entities/Subject';

import ISubjectsRepository from '../ISubjectsRepository';

class FakeSubjectsRepository implements ISubjectsRepository {
  private subjects: Subject[] = [];

  public async findAll(): Promise<Subject[]> {
    return this.subjects;
  }

  public async findByName(name: string): Promise<Subject | undefined> {
    const subjects = this.subjects.find(findSubject =>
      findSubject.name.includes(name),
    );

    return subjects;
  }

  public async filterByName(name: string): Promise<Subject[] | undefined> {
    const filtered = this.subjects.filter(findSubject =>
      findSubject.name.includes(name),
    );

    return filtered;
  }

  public async findById(id: string): Promise<Subject | undefined> {
    const findSubject = this.subjects.find(subject => subject.id === id);

    return findSubject;
  }

  public async create(data: ICreateSubjectDTO): Promise<Subject> {
    const subject = new Subject();

    Object.assign(subject, { id: uuid() }, data);
    this.subjects.push(subject);

    return subject;
  }

  public async save(subject: Subject): Promise<Subject> {
    const findIndex = this.subjects.findIndex(
      findSubject => findSubject.id === subject.id,
    );

    this.subjects[findIndex] = subject;

    return subject;
  }

  public async deleteById(id: string): Promise<void> {
    const newArray = this.subjects.filter(findSubject => findSubject.id !== id);

    this.subjects = newArray;
  }
}

export default FakeSubjectsRepository;
