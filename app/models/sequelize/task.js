module.exports = function taskModel(sequelize, DataTypes) {
  const task = sequelize.define('tasks', {
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

  task.associate = (models) => {
    task.hasMany(models.note, {
      foreignKey: 'taskID'
    });
  };

  return task;
};
