module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CodeTVA', {
    ID_CodeTVA: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Code: { type: DataTypes.DECIMAL(4,2), allowNull: false, unique: true },
    Libelle: { type: DataTypes.STRING(150), allowNull: false },
    TauxTVA: { type: DataTypes.DECIMAL(4,2), allowNull: false }
  }, {
    tableName: 'CodeTVA',
    timestamps: false
  });
};
