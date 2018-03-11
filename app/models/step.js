module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('goals', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Step.associate = (models) => {
    // Accomplish goals by breaking them down in to steps
    models.Step.hasOne(models.Goal);
  };

  return Step;
};
