'use strict';
const fs = require('fs'); ``

module.exports = {
  up: (queryInterface, Sequelize) => {
    const testResultsRawData = JSON.parse(fs.readFileSync('./database/resource/test-results.json', 'utf8'));

    const testResults = testResultsRawData.map((testResult) => {
      return {
        ...testResult,
        duration: testResult.duration + "ms",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    })

    return queryInterface.bulkInsert('TestResult', testResults,{
      updateOnDuplicate: ["name", "status", "duration"],
      upsertKeys: ['id']
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve();
  }
};
