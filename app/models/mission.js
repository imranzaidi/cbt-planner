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
    }
  });

  Mission.associate = (models) => {
    models.Mission.hasMany(models.Goal);
  };

  return Mission;
};
