/***********************
 * Module Dependencies *
 ***********************/
const enums = require('../consts/enums');


module.exports = (sequelize, DataTypes) => {
  const TaskList = sequelize.define('task_list', {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date'
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'weekly',
      values: enums.taskListTypes
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

  TaskList.associate = (models) => {
    models.TaskList.belongsToMany(models.Task, { as: 'Tasks', through: 'task_lists_tasks' });
    models.TaskList.belongsTo(models.User, { as: 'User' });
  };

  return TaskList;
};
