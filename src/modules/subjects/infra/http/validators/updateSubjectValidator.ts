import { celebrate, Joi, Segments } from 'celebrate';

const updateSubjectValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().not().empty(),
  }),
});

export default updateSubjectValidator;
