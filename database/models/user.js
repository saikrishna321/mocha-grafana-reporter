module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.testResults, {
      foreignKey: 'userId',
      as: 'testresults',
      onDelete: 'CASCADE',
    });
  };
  return User;
};

// database/models/user.js