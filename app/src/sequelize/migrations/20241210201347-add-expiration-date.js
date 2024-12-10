/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('storage', 'expiration_date', {
      type: Sequelize.DATE,
      allowNull: false,
      comment: 'Срок годности',
    });
  },
};
