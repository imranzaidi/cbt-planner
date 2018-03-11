module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('goals', {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Goal.associate = (models) => {
    // Goals serve one or more of the following
    models.Goal.hasMany(models.Value);
    models.Goal.hasMany(models.Mission);
    models.Goal.hasMany(models.Role);

    // Accomplish goals by breaking them down in to steps
    models.Goal.hasMany(models.Step);
  };

  return Goal;
};
