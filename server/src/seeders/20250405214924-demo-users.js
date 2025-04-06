export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        username: "vinylQueen88",
        password: "password1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "johnnyBgood",
        password: "password2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
