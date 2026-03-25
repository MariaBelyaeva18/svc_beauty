# svc_beauty (NestJS backend)

## Требования

- Node.js 16+ (рекомендуется 18+)
- PostgreSQL 12+

## Переменные окружения

Сервис читает конфиг БД из переменных окружения (см. `app/src/sequelize/sequelize.config.ts`).

Минимальный набор:

```bash
export PORT=8080
export POSTGRES_HOST=localhost
export POSTGRES_PORT=5432
export POSTGRES_USER=developer
export POSTGRES_PASSWORD=123
export POSTGRES_DB=beauty_shop
export POSTGRES_STATEMENT_TIMEOUT=30000
export POSTGRES_POOL_MAX=10
export POSTGRES_POOL_MIN=0
```

JWT:

```bash
export JWT_SECRET="change-me"
export JWT_EXPIRES_IN_SECONDS=86400
```

## Установка и запуск

```bash
cd app
npm ci
npm run start:dev
```

Сервис стартует на `http://localhost:${PORT}`.

## Миграции

В репозитории есть миграции Sequelize CLI:

```bash
cd app
npx sequelize-cli db:migrate
```

Конфиг миграций задаётся в `app/src/sequelize/sequelize.migration.config.ts`.

## Авторизация

- `POST /auth` — логин, в ответе возвращается `token`.
- `POST /auth/register` — регистрация.

Все остальные маршруты требуют заголовок:

```text
Authorization: Bearer <token>
```

## Формат ошибок

Все ошибки возвращаются в едином формате:

```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Missing Authorization header",
  "data": { "errorList": { "field": "errorEmpty" } },
  "path": "/some/route",
  "timestamp": "2026-03-25T00:00:00.000Z"
}
```

