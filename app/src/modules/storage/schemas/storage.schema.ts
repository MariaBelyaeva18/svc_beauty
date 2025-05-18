import * as Joi from 'joi';

const messages = {
  'any.required': 'errorEmpty',
  'any.empty': 'errorEmpty',
  'string.empty': 'errorEmpty',
  'string.base': 'errorInvalidType',
  'number.base': 'errorInvalidType',
  'date.base': 'errorInvalidType',
  'number.min': 'errorMinValue',
  'date.iso': 'errorInvalidDateFormat',
};

const create = Joi.object({
  materialName: Joi.string().empty([null, '']).required().messages(messages),
  amount: Joi.number().empty([null, '']).required().min(1).messages(messages),
  expirationDate: Joi.date().empty([null, '']).required().messages(messages).iso(),
});

const update = Joi.object({
  id: Joi.string().empty([null, '']).required().messages(messages),
  materialName: Joi.string().empty([null, '']).required().messages(messages),
  amount: Joi.number().empty([null, '']).required().min(1).messages(messages),
  expirationDate: Joi.date().empty([null, '']).required().messages(messages).iso(),
});

export default {
  create,
  update,
};
