/**
 * Stakeholders are key people related to a role.
 */
module.exports = (sequelize, DataTypes) => {
  const Stakeholder = sequelize.define('stakeholders', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Stakeholder;
};
