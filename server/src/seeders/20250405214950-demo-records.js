export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Records", [
      {
        album: "Rumours",
        artist: "Fleetwood Mac",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        album: "Abbey Road",
        artist: "The Beatles",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Records", null, {});
  },
};
