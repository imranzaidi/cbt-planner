module.exports = function notesModel(sequelize, DataTypes) {
  return sequelize.define('notes', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
