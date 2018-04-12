/***********************
 * Module Dependencies *
 ***********************/
const enums = require('../consts/enums');


module.exports = (sequelize, DataTypes) => {
  const TaskList = sequelize.define('task_list', {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'weekly',
      values: enums.taskListTypes
    }
  });

  TaskList.associate = (models) => {
    models.TaskList.belongsToMany(models.Task, { through: 'task_lists_tasks' });
  };

  return TaskList;
};
