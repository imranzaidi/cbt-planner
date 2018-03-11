/***********************
 * Module Dependencies *
 ***********************/
const enums = require('../consts/enums');


module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('tasks', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'a',
      values: enums.taskPriorities
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'incomplete',
      values: enums.taskStatuses
    }
  });

  Task.associate = (models) => {
    models.Task.hasMany(models.Note);
  };

  return Task;
};
