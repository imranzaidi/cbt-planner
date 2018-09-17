/**
 * Example usage:
 *
 * statement - simple missions statements, nothing fancy here. e.g. "I'm going to build a CBT planner app."
 *
 * Note: the context of a mission would be something like lifelong purpose, a daily habit, family and friends,
 *       career, broader , daily
 */
module.exports = (sequelize, DataTypes) => {
  const Mission = sequelize.define('missions', {
    statement: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accomplished: {
      type: DataTypes.BOOLEAN,
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

  // Mission.associate = (models) => {
  //   models.Mission.belongsTo(models.User, { through: models.MissionsUsers });
  // };

  return Mission;
};
