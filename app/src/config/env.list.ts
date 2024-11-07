const requiredEnv = {
  KAFKA_CONNECT_TIMEOUT: 'Kafka таймаут подключения',
  KAFKA_REQUEST_TIMEOUT: 'Kafka таймаут запроса',
  KAFKA_RESTART_DELAY: 'Задержка переподключения consumers Kafka',
  KAFKA_CLIENT_ID: 'ID клиента kafka',
  KAFKA_HOST: 'Хост kafka',

  POSTGRES_HOST: 'Хост БД postgres',
  POSTGRES_PORT: 'Порт БД postgres',
  POSTGRES_USER: 'Пользователь БД postgres',
  POSTGRES_PASSWORD: 'Пароль БД postgres',
  POSTGRES_LICENSE_DB: 'Имя БД postgres',
  POSTGRES_POOL_MAX: 'Максимальный пул подключений к БД postgres',
  POSTGRES_POOL_MIN: 'Минимальный пул подключений к БД postgres',
  POSTGRES_STATEMENT_TIMEOUT: 'Таймаут выполнения запроса к БД',

  CLIENT_ID: 'Клиент приложения',
  CLIENT_SECRET: 'Секретный ключ клиента приложения',
};

const additionalEnv = {
  PLATFORM_API_V1_URL: 'Url обращения к платформе',
  PLATFORM_REQUEST_TIMEOUT: 'Таймаут обращения к платформе, по умолчанию 60000',

  SVC_URL: 'Адрес приложения, по умолчанию http://svc_license:8080',
  SVC_PORT: 'Порт приложения, по умолчанию 8080',
  SVC_HOSTNAME: 'Порт приложения, по умолчанию 0.0.0.0',

  KAFKA_DISABLE_SASL: 'Отключение Kafka SASL',
  KAFKA_PASSWORD: 'Kafka SASL пароль',
  KAFKA_USERNAME: 'Kafka SASL пользователь',

  GRAY_LOG_APP: 'Приложение gray log',
  GRAY_LOG_HOST: 'Хост gray log',
  GRAY_LOG_PORT: 'Порт gray log',

  PROJECT_PREFIX: 'Префикс для Kafka топиков',
};

export default {
  requiredEnv,
  additionalEnv,
  requiredEnvKeys: Object.keys(requiredEnv),
  additionalEnvKeys: Object.keys(additionalEnv),
};
