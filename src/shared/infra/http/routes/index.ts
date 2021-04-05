import { Router } from 'express';

import subjectsRouter from '@modules/subjects/infra/http/routes/subjects.routes';

const routes = Router();

routes.use('/subjects', subjectsRouter);

export default routes;
