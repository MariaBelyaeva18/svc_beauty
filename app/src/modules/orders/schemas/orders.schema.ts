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
  executionDate: Joi.date().empty([null, '']).required().min('now').messages(messages).iso(),
  time: Joi.string().empty([null, '']).required().messages(messages),
  serviceId: Joi.string().empty([null, '']).required().messages(messages),
  clientId: Joi.string().empty([null, '']).required().messages(messages),
  masterId: Joi.string().empty([null, '']).required().messages(messages),
  description: Joi.string().empty([null, '']).messages(messages),
});

const update = Joi.object({
  id: Joi.string().empty([null, '']).required().messages(messages),
  executionDate: Joi.date().empty([null, '']).required().messages(messages).iso(),
  time: Joi.string().empty([null, '']).required().messages(messages),
  serviceId: Joi.string().empty([null, '']).required().messages(messages),
  clientId: Joi.string().empty([null, '']).required().messages(messages),
  masterId: Joi.string().empty([null, '']).required().messages(messages),
  description: Joi.string().empty([null, '']).messages(messages),
});

export default {
  create,
  update,
};
