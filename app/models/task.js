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
      values: ['a', 'b', 'c']
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'incomplete',
      values: ['incomplete', 'in progress', 'completed', 'forwarded']
    }
  });

  Task.associate = (models) => {
    models.Task.hasMany(models.Note);
  };

  return Task;
};
