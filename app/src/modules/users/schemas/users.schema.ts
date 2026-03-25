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

const update = Joi.object({
  name: Joi.string().empty([null, '']).required().messages(messages),
  middle_name: Joi.string().empty([null, '']).messages(messages),
  last_name: Joi.string().empty([null, '']).required().messages(messages),
  phone_number: Joi.string().empty([null, '']).messages(messages),
  login: Joi.string().empty([null, '']).required().messages(messages),
  password: Joi.string().empty([null, '']).required().messages(messages),
});

export default {
  update,
};
