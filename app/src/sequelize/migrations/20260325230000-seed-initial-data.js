/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    const now = new Date();
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const ids = {
      clientUser: '1f3c7065-3b0a-4e5f-87a3-2ab2f4fa6ae5',
      masterUser: '7b2a8f2e-1c39-4d77-8d70-2c1c7e874a9e',
      service: 'd0650e0e-6ba4-4b0c-b7d2-5e3d8c4ce83d',
      employeeService: '2a0610a7-95b8-4636-8b6f-bb93e1f1f2a0',
      storageMaterial: 'a02c44e4-9c63-42b2-a9c0-2ef2ae6016fa',
      order: '4ee6ebaa-4bb1-4b0e-9f90-4d1f2b1d2f46',
      orderMaterial: '3aa3f7c0-1fcd-469b-9f54-5d3c834f04a0',
      employeeAbsence: '0c26cc2c-8f67-4c20-8c1f-2d9b9e23f3c6',
    };

    try {
      await queryInterface.bulkInsert(
        'users',
        [
          {
            id: ids.clientUser,
            name: 'Тестовый',
            middle_name: null,
            last_name: 'Клиент',
            login: 'seed_client',
            password: '123',
            role_id: 'client',
            phone_number: '+79000000001',
            avatar_path: null,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
          },
          {
            id: ids.masterUser,
            name: 'Тестовый',
            middle_name: null,
            last_name: 'Мастер',
            login: 'seed_master',
            password: '123',
            role_id: 'master',
            phone_number: '+79000000002',
            avatar_path: null,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
          },
        ],
        { transaction },
      );

      await queryInterface.bulkInsert(
        'services',
        [
          {
            id: ids.service,
            name: 'Маникюр (тест)',
            description: 'Тестовая услуга для первого заказа',
            cost: 1500.0,
            duration: '01:00:00',
            createdAt: now,
            updatedAt: now,
          },
        ],
        { transaction },
      );

      await queryInterface.bulkInsert(
        'employee_service',
        [
          {
            id: ids.employeeService,
            master_id: ids.masterUser,
            service_id: ids.service,
            createdAt: now,
            updatedAt: now,
          },
        ],
        { transaction },
      );

      await queryInterface.bulkInsert(
        'storage',
        [
          {
            id: ids.storageMaterial,
            material_name: 'База для ногтей (тест)',
            amount: 10,
            expiration_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            createdAt: now,
            updatedAt: now,
          },
        ],
        { transaction },
      );

      await queryInterface.bulkInsert(
        'orders',
        [
          {
            id: ids.order,
            execution_date: tomorrow,
            time: '10:00',
            service_id: ids.service,
            client_id: ids.clientUser,
            master_id: ids.masterUser,
            description: 'Тестовый заказ из миграции',
            status_id: 'created',
            createdAt: now,
            updatedAt: now,
          },
        ],
        { transaction },
      );

      await queryInterface.bulkInsert(
        'order_materials',
        [
          {
            id: ids.orderMaterial,
            material_id: ids.storageMaterial,
            order_id: ids.order,
            amount: 1,
            createdAt: now,
            updatedAt: now,
          },
        ],
        { transaction },
      );

      await queryInterface.bulkInsert(
        'employee_absence',
        [
          {
            id: ids.employeeAbsence,
            employee_id: ids.masterUser,
            date_from: new Date('2000-01-01T00:00:00.000Z'),
            date_to: new Date('2000-01-02T00:00:00.000Z'),
            reason: 'Тестовая запись (не влияет на расписание)',
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
          },
        ],
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
