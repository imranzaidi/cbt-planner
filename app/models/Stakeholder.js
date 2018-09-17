/**
 * Stakeholders are key people related to a role.
 */
module.exports = (sequelize, DataTypes) => {
  const Stakeholder = sequelize.define('stakeholders', {
    title: {
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

  // Stakeholder.associate = (models) => {
  //   models.Stakeholder.belongsTo(models.User, { through: models.StakeholdersUsers });
  // };

  return Stakeholder;
};
