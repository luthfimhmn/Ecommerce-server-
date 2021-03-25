'use strict';
const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const banners = JSON.parse(fs.readFileSync('./seedData/banners.json', 'utf8'))
   banners.forEach(el => {
     el.createdAt = new Date()
     el.updatedAt = new Date()
   });
   await queryInterface.bulkInsert('Banners', banners, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Banners', null, {})
  }
};
