module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CodeTypeVoie', {
    ID_CodeTypeVoie: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Code: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    Libelle: { type: DataTypes.STRING(50), allowNull: false }
  }, {
    tableName: 'CodeTypeVoie',
    timestamps: false
  });
};
