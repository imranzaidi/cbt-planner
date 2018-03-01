module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('notes', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Note.associate = (models) => {
    models.Note.belongsTo(models.Task, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Note;
};
