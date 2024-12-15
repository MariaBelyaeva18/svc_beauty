module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'employee_absence',
      {
        id: {
          type: Sequelize.UUID,
          unique: true,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        employee_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            key: 'id',
            model: 'users',
          },
          comment: 'id сотрудника',
        },
        date_from: {
          type: Sequelize.DATE,
          allowNull: false,
          comment: 'Дата от',
        },
        date_to: {
          type: Sequelize.DATE,
          allowNull: false,
          comment: 'Дата до',
        },
        reason: {
          type: Sequelize.TEXT,
          allowNull: false,
          comment: 'Причина',
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
        comment: 'Отсутствия сотрудников',
      },
    );
  },
};
