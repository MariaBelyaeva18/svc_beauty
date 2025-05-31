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
  middleName: Joi.string().empty([null, '']).messages(messages),
  lastName: Joi.string().empty([null, '']).required().messages(messages),
  phone: Joi.string().empty([null, '']).messages(messages),
  username: Joi.string().empty([null, '']).required().messages(messages),
  password: Joi.string().empty([null, '']).required().messages(messages),
  roleId: Joi.string().empty([null, '']).required().messages(messages),
  masterServiceIds: Joi.array()
    .empty(null)
    .items(Joi.string().empty([null, '']).messages(messages)),
});

const update = Joi.object({
  id: Joi.string().empty([null, '']).required().messages(messages),
  name: Joi.string().empty([null, '']).required().messages(messages),
  middleName: Joi.string().empty([null, '']).messages(messages),
  lastName: Joi.string().empty([null, '']).required().messages(messages),
  phone: Joi.string().empty([null, '']).messages(messages),
  username: Joi.string().empty([null, '']).required().messages(messages),
  password: Joi.string().empty([null, '']).required().messages(messages),
  roleId: Joi.string().empty([null, '']).required().messages(messages),
  masterServiceIds: Joi.array()
    .empty(null)
    .items(Joi.string().empty([null, '']).messages(messages)),
});

export default {
  create,
  update,
};
