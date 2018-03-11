/**
 * Example usage:
 *
 * title - Engineer
 * clarifyingStatements - I am creative, adaptive, efficient and thorough. I use the right
 *                        tools, methodologies and paradigms to solve complex problems and
 *                        deliver solutions that add value.
 * stakeholders - Myself, Co-workers, Users
 */
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clarifyingStatements: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Role.associate = (models) => {
    models.Role.hasMany(models.Stakeholder);
  };

  return Role;
};
