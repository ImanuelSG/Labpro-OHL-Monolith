import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNotEmail(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isNotEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          // Simple regex to check if value resembles an email address
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return typeof value === 'string' && !emailRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should not be an email address`;
        },
      },
    });
  };
}
