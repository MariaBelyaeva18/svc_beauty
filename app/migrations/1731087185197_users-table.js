/* eslint-disable camelcase */
// todo добавить пользователю аватар
exports.shorthands = undefined;

exports.up = async (pgm) => {
  await pgm.sql(`
    CREATE TABLE roles (
      "id" uuid PRIMARY KEY not null,
      "role" varchar(10) not null,
      "description" varchar(255),
      "createdAt" timestamp with time zone not null,
      "updatedAt" timestamp with time zone not null,
      "deletedAt" timestamp with time zone
    );

    CREATE TABLE users (
      "id" uuid PRIMARY KEY not null,
      "name" varchar(255) not null,
      "middle_name" varchar(255),
      "last_name" varchar(255),
      "login" varchar(255),
      "password" varchar(255),
      "phone_number" varchar(255),
      "role_id" uuid REFERENCES roles ON DELETE CASCADE,
      "createdAt" timestamp with time zone not null,
      "updatedAt" timestamp with time zone not null,
      "deletedAt" timestamp with time zone
    );
  `);
};

exports.down = () => null;
