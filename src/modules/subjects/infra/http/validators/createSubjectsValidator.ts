import { celebrate, Joi, Segments } from 'celebrate';

const createSubjectValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
});

export default createSubjectValidator;
