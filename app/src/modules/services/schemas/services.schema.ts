import * as Joi from 'joi';

const messages = {
  'any.required': 'errorEmpty',
  'any.empty': 'errorEmpty',
  'string.empty': 'errorEmpty',
  'string.base': 'errorInvalidType',
  'number.base': 'errorInvalidType',
  'date.base': 'errorInvalidType',
  'number.min': 'errorMinValue',
  'date.min': 'errorMinValue',
  'date.iso': 'errorInvalidDateFormat',
};

const create = Joi.object({
  name: Joi.string().empty([null, '']).required().messages(messages),
  description: Joi.string().empty([null, '']).messages(messages),
  cost: Joi.number().empty([null, '']).required().min(1).messages(messages),
  duration: Joi.string().empty([null, '']).required().messages(messages),
});

const update = Joi.object({
  id: Joi.string().empty([null, '']).required().messages(messages),
  name: Joi.string().empty([null, '']).required().messages(messages),
  description: Joi.string().empty([null, '']).messages(messages),
  cost: Joi.number().empty([null, '']).required().min(1).messages(messages),
  duration: Joi.string().empty([null, '']).required().messages(messages),
});

export default {
  create,
  update,
};
