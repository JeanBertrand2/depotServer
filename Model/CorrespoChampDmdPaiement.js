module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CorrespoChampDmdPaiement', {
    ID_CorrespondanceChampDmdPaiement: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    NomRubrique: DataTypes.STRING(50),
    RangColonneExcel: DataTypes.DECIMAL(4,2),
    TypeColonne: DataTypes.STRING(50),
    FormatColonne: DataTypes.STRING(50)
  }, {
    tableName: 'CorrespoChampDmdPaiement',
    timestamps: false
  });
};
