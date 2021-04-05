import { celebrate, Joi, Segments } from 'celebrate';

const serachSubjectValidator = celebrate({
  [Segments.QUERY]: {
    id: Joi.string(),
    name: Joi.string(),
  },
});

export default serachSubjectValidator;
