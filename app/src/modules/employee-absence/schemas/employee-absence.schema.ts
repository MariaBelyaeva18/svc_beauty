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
  employeeId: Joi.string().empty([null, '']).required().messages(messages),
  dateFrom: Joi.date().empty([null, '']).required().messages(messages).iso(),
  dateTo: Joi.date().empty([null, '']).required().min(Joi.ref('dateFrom')).messages(messages).iso(),
  reason: Joi.string().empty([null, '']).required().messages(messages),
});

const update = Joi.object({
  id: Joi.string().empty([null, '']).required().messages(messages),
  employeeId: Joi.string().empty([null, '']).required().messages(messages),
  dateFrom: Joi.date().empty([null, '']).required().messages(messages).iso(),
  dateTo: Joi.date().empty([null, '']).required().messages(messages).iso(),
  reason: Joi.string().empty([null, '']).required().messages(messages),
});

export default {
  create,
  update,
};
