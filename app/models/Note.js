module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('notes', {
    content: {
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

  Note.associate = (models) => {
    models.Note.belongsTo(models.Task);
  };

  return Note;
};
