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
  last_name: Joi.string().empty([null, '']).required().messages(messages),
  middle_name: Joi.string().empty([null, '']).messages(messages),
  name: Joi.string().empty([null, '']).required().messages(messages),
  password: Joi.string().empty([null, '']).required().messages(messages),
  phone: Joi.string().empty([null, '']).messages(messages),
  repeatPassword: Joi.string().empty([null, '']).required().messages(messages),
  role: Joi.string().empty([null, '']).required().messages(messages),
  username: Joi.string().empty([null, '']).required().messages(messages),
});

export default {
  create,
};
