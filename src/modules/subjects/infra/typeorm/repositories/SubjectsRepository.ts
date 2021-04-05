import { getRepository, Like, Repository } from 'typeorm';

import ICreateSubjectDTO from '@modules/subjects/dtos/ICreateSubjectDTO';
import ISubjectsRepository from '@modules/subjects/repositories/ISubjectsRepository';

import Subject from '../entities/Subject';

class SubjectsRepository implements ISubjectsRepository {
  private ormRepository: Repository<Subject>;

  constructor() {
    this.ormRepository = getRepository(Subject);
  }

  public async findAll(): Promise<Subject[]> {
    const subjects = await this.ormRepository.find();

    return subjects;
  }

  public async findByName(name: string): Promise<Subject | undefined> {
    const subject = await this.ormRepository.findOne({ where: { name } });

    return subject;
  }

  public async filterByName(name: string): Promise<Subject[] | undefined> {
    const subjects = await this.ormRepository.find({
      where: {
        name: Like(`%${name}%`),
      },
    });

    return subjects;
  }

  public async findById(id: string): Promise<Subject | undefined> {
    const subject = await this.ormRepository.findOne({ where: { id } });

    return subject;
  }

  public async create(data: ICreateSubjectDTO): Promise<Subject> {
    const subject = this.ormRepository.create(data);

    await this.ormRepository.save(subject);

    return subject;
  }

  public async save(subject: Subject): Promise<Subject> {
    return this.ormRepository.save(subject);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default SubjectsRepository;
