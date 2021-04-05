import { Router } from 'express';

import SubjectsController from '../controllers/SubjectsController';
import createSubjectValidator from '../validators/createSubjectsValidator';
import serachSubjectValidator from '../validators/searchSubjectValidator';
import updateSubjectValidator from '../validators/updateSubjectValidator';

const subjectsRouter = Router();

const subjectsController = new SubjectsController();

subjectsRouter.get('/', serachSubjectValidator, subjectsController.index);
subjectsRouter.get('/:id', subjectsController.show);
subjectsRouter.post('/', createSubjectValidator, subjectsController.create);
subjectsRouter.put('/:id', updateSubjectValidator, subjectsController.update);
subjectsRouter.delete('/:id', subjectsController.delete);

export default subjectsRouter;
