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
    },
    due: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    underscored: true
  });

  Task.associate = (models) => {
    models.Task.hasMany(models.Note);
    models.Task.belongsToMany(models.TaskList, { as: 'TaskLists', through: 'task_lists_tasks' });
    models.Task.belongsTo(models.User, { as: 'User' });
  };

  return Task;
};
