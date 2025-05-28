import { PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces/features/pipe-transform.interface';

export class JsonParsePipe implements PipeTransform {
  constructor(private nested = false) {}

  parse = (value) => (value && typeof value === 'string' ? JSON.parse(value as string) : value);

  transform(value: unknown, metadata: ArgumentMetadata) {
    // for contextId
    if (metadata.type === 'custom') {
      return value;
    }
    if (this.nested) {
      return Object.keys(value).reduce((att, key) => {
        if (Array.isArray(value[key])) {
          return {
            ...att,
            [key]: value[key].map((itValue) => {
              const updatedItValue = { ...itValue };
              Object.keys(updatedItValue).forEach((el) => {
                if (['isContent', 'isStructure'].includes(el)) {
                  updatedItValue[el] = this.parse(updatedItValue[el]);
                }
              });
              return this.parse(updatedItValue);
            }),
          };
        }
        return { ...att, [key]: this.parse(value[key]) };
      }, {});
    }
    return this.parse(value);
  }
}
