module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
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

  User.associate = (models) => {
    models.User.hasMany(models.Goal, { as: 'Goals' });
    models.User.hasMany(models.Mission, { as: 'Missions' });
    models.User.hasMany(models.Role, { as: 'Roles' });
    models.User.hasMany(models.Stakeholder, { as: 'Stakeholders' });
    models.User.hasMany(models.Task, { as: 'Tasks' });
    models.User.hasMany(models.TaskList, { as: 'TaskLists' });
    models.User.hasMany(models.Value, { as: 'Values' });
  };

  return User;
};
