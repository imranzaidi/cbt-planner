module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('steps', {
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
    models.Step.belongsTo(models.Goal);
  };

  return Step;
};
