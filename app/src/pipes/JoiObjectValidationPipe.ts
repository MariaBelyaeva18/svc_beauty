import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export default class JoiObjectValidationPipe implements PipeTransform {
  constructor(
    private schema: ObjectSchema,
    private errorMessage: string,
  ) {}

  private placeholder(path, error, errorListRef) {
    const key = path[0];
    if (path.length === 1) {
      // eslint-disable-next-line no-param-reassign
      errorListRef[key] = error;
    } else {
      if (!errorListRef[key]) {
        // eslint-disable-next-line no-param-reassign
        errorListRef[key] = {};
      }
      this.placeholder(path.slice(1), error, errorListRef[key]);
    }
  }

  transform(value: unknown, context?: unknown) {
    if (typeof value === 'string') {
      return value;
    }
    const { error } = this.schema.validate(value, {
      abortEarly: false,
      stripUnknown: true,
      context,
    });
    if (error) {
      const errorList = {};
      error.details.forEach((detail) => {
        const { path, message } = detail;
        this.placeholder(path, message, errorList);
      });
      throw new BadRequestException({
        message: this.errorMessage,
        data: { errorList },
      });
    }
    return value;
  }
}
