module.exports = function taskModel(sequelize, DataTypes) {
  return sequelize.define('Task', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'a',
      values: ['a', 'b', 'c']
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'incomplete',
      values: ['incomplete', 'in progress', 'completed', 'forwarded']
    }
  });
};
