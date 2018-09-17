module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
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
    // models.User.hasMany(models.Goal, { through: models.GoalsUsers });
    // models.User.hasMany(models.Mission, { through: models.MissionsUsers });
    // models.User.hasMany(models.Role, { through: models.RolesUsers });
    // models.User.hasMany(models.Stakeholder, { through: models.StakeholdersUsers });
    models.User.hasMany(models.Task, { as: 'Tasks' });
    // models.User.hasMany(models.TaskList, { through: models.TaskListsUsers });
    // models.User.hasMany(models.Value, { through: models.ValuesUsers });
  };

  return User;
};
