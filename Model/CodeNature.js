module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CodeNature', {
    ID_CodeNature: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Code: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    Libelle: { type: DataTypes.STRING(150), allowNull: false }
  }, {
    tableName: 'CodeNature',
    timestamps: false
  });
};

