import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSubjectService from '@modules/subjects/services/CreateSubjectService';
import DeleteSubjectService from '@modules/subjects/services/DeleteSubjectService';
import FilterSubjectByNameService from '@modules/subjects/services/FilterSubjectByNameService';
import ListSubjectByIdService from '@modules/subjects/services/ListSubjectByIdService';
import ListSubjectService from '@modules/subjects/services/ListSubjectService';
import UpdateSubjectService from '@modules/subjects/services/UpdateSubjectService';

export default class SubjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    let subjects;

    if (!name) {
      const listSubjectsService = container.resolve(ListSubjectService);

      subjects = await listSubjectsService.execute();
    } else {
      const filterSubjectByName = container.resolve(FilterSubjectByNameService);
      subjects = await filterSubjectByName.execute(name.toString());
    }

    return response.json(classToClass(subjects));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listSubjectById = container.resolve(ListSubjectByIdService);

    const subject = await listSubjectById.execute(String(id));

    return response.json(classToClass(subject));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createSubject = container.resolve(CreateSubjectService);

    const subject = await createSubject.execute({ name });

    return response.json(subject);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const updateSubjectService = container.resolve(UpdateSubjectService);

    const subject = await updateSubjectService.execute({
      id: String(id),
      name,
    });

    return response.json(classToClass(subject));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSubjectService = container.resolve(DeleteSubjectService);

    await deleteSubjectService.execute(String(id));

    return response.status(204).json({ message: 'deleted' });
  }
}
