/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'roles',
        {
          id: {
            type: Sequelize.STRING,
            unique: true,
            primaryKey: true,
            defaultValue: 'client',
          },
          role: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: 'Название роли',
          },
          description: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Описание роли',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE,
          },
        },
        {
          comment: 'Системные роли',
          transaction,
        },
      );

      await queryInterface.bulkInsert(
        'roles',
        [
          {
            id: 'client',
            role: 'Клиент',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'master',
            role: 'Мастер',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'admin',
            role: 'Управляющий',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {
          transaction,
        },
      );

      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.UUID,
            unique: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: 'Имя пользователя',
          },
          middle_name: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Отчество пользователя',
          },
          last_name: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Фамилия пользователя',
          },
          login: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
            comment: 'Логин',
          },
          password: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Пароль',
          },
          role_id: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'client',
            references: {
              key: 'id',
              model: 'roles',
            },
            comment: 'Id роли пользователя',
          },
          phone_number: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Номер телефона',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE,
          },
        },
        {
          comment: 'Пользователи',
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
