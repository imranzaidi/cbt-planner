module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('goals', {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Goal.associate = (models) => {
    // Goals serve one or more of the following
    models.Goal.belongsToMany(models.Value, { through: 'goals_values' });
    models.Goal.belongsToMany(models.Mission, { through: 'goals_missions' });
    models.Goal.belongsToMany(models.Role, { through: 'goals_roles' });

    // Accomplish goals by breaking them down in to steps
    models.Goal.hasMany(models.Step);
  };

  return Goal;
};
