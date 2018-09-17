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

  Role.associate = (models) => {
    models.Role.belongsToMany(models.Stakeholder, { through: 'roles_stakeholders' });
    // models.Role.belongsTo(models.User, { through: models.RolesUsers });
  };

  return Role;
};
