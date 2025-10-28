module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DonneesBaseCombo', {
    ID_DonneesBaseCombo: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Type: { type: DataTypes.STRING(30), allowNull: false },
    Code: { type: DataTypes.STRING(20), allowNull: false },
    Libelle: { type: DataTypes.STRING(50), allowNull: false }
  }, {
    tableName: 'DonneesBaseCombo',
    timestamps: false
  });
};
