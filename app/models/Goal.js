module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('goals', {
    statement: {
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

  Goal.associate = (models) => {
    // Goals serve one or more of the following
    models.Goal.belongsToMany(models.Mission, { through: 'goals_missions' });
    models.Goal.belongsToMany(models.Role, { through: 'goals_roles' });
    models.Goal.belongsToMany(models.Value, { through: 'goals_values' });

    // Accomplish goals by breaking them down in to steps
    models.Goal.hasMany(models.Step);

    models.Goal.belongsTo(models.User, { as: 'User' });
  };

  return Goal;
};
