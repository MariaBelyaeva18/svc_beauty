/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'statuses',
        {
          id: {
            type: Sequelize.UUID,
            unique: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          status: {
            type: Sequelize.STRING(30),
            allowNull: false,
            comment: 'название статуса',
          },
          description: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Описание статуса',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        {
          comment: 'Статусы',
          transaction,
        },
      );

      await queryInterface.createTable(
        'services',
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
            comment: 'Название услуги',
          },
          description: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: 'Описание услуги',
          },
          cost: {
            type: Sequelize.NUMERIC(9, 2),
            allowNull: false,
            comment: 'Стоимость услуги',
          },
          duration: {
            type: Sequelize.TIME,
            allowNull: false,
            comment: 'Длительность услуги',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        {
          comment: 'Услуги',
          transaction,
        },
      );

      await queryInterface.addIndex('services', ['name'], {
        name: 'services_idx_name',
        transaction,
      });

      await queryInterface.createTable(
        'employee_service',
        {
          id: {
            type: Sequelize.UUID,
            unique: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          master_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              key: 'id',
              model: 'users',
            },
            comment: 'id мастера',
          },
          service_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              key: 'id',
              model: 'services',
            },
            comment: 'id услуги',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        {
          comment: 'Услуги мастеров',
          transaction,
        },
      );

      await queryInterface.addIndex('employee_service', ['master_id'], {
        name: 'services_idx_master_id',
        transaction,
      });
      await queryInterface.addIndex('employee_service', ['service_id'], {
        name: 'employee_service_idx_service_id',
        transaction,
      });

      await queryInterface.createTable(
        'orders',
        {
          id: {
            type: Sequelize.UUID,
            unique: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          execution_date: {
            type: Sequelize.DATE,
            allowNull: false,
            comment: 'Дата исполнения заказа',
          },
          service_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              key: 'id',
              model: 'services',
            },
            comment: 'id услуги',
          },
          client_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              key: 'id',
              model: 'users',
            },
            comment: 'id клиента (заказчика)',
          },
          master_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              key: 'id',
              model: 'users',
            },
            comment: 'id мастера',
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: false,
            comment: 'Комментарий к заказу',
          },
          status_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              key: 'id',
              model: 'statuses',
            },
            comment: 'id статуса',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        {
          comment: 'Заказы',
          transaction,
        },
      );

      await queryInterface.addIndex('orders', ['execution_date'], {
        name: 'orders_idx_execution_date',
        transaction,
      });
      await queryInterface.addIndex('orders', ['service_id'], {
        name: 'orders_idx_service_id',
        transaction,
      });
      await queryInterface.addIndex('orders', ['client_id'], {
        name: 'orders_idx_client_id',
        transaction,
      });
      await queryInterface.addIndex('orders', ['master_id'], {
        name: 'orders_idx_master_id',
        transaction,
      });

      await queryInterface.createTable(
        'storage',
        {
          id: {
            type: Sequelize.UUID,
            unique: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          material_name: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: 'Название материала',
          },
          amount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            comment: 'Кол-во единиц материала',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        {
          comment: 'Склад',
          transaction,
        },
      );

      await queryInterface.createTable(
        'order_materials',
        {
          id: {
            type: Sequelize.UUID,
            unique: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          material_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              key: 'id',
              model: 'storage',
            },
            comment: 'Название материала',
          },
          order_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              key: 'id',
              model: 'orders',
            },
            comment: 'Кол-во единиц материала',
          },
          amount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            comment: 'Кол-во зарезервированного материала',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        {
          comment: 'Материалы для заказа',
          transaction,
        },
      );

      await queryInterface.addIndex('order_materials', ['material_id'], {
        name: 'order_materials_idx_master_id',
        transaction,
      });
      await queryInterface.addIndex('order_materials', ['order_id'], {
        name: 'order_materials_idx_order_id',
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
