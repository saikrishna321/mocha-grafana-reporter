module.exports = (sequelize, DataTypes) => {
  const TestResult = sequelize.define('TestResults', {
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    duration: DataTypes.STRING
  }, {});
  TestResult.associate = function (models) {
    // associations can be defined here
    TestResult.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    })
  };
  return TestResult;
};

// database/models/user.js