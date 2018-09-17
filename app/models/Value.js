/***********************
 * Module Dependencies *
 ***********************/
const enums = require('../consts/enums');


/**
 * Governing values form the foundation, enabling you to realize the type of life you want to live.
 *
 * Example usage:
 *
 * category - personal
 * valueStatement - I value integrity
 * description - Intellectual honesty is a function of critical thought and rational analysis
 */
module.exports = (sequelize, DataTypes) => {
  const Value = sequelize.define('values', {
    valueStatement: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'personal',
      values: enums.valueCategories
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

  Value.associate = (models) => {
    models.Value.belongsTo(models.User, { through: models.ValuesUsers });
  };

  return Value;
};
