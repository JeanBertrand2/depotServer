module.exports = (sequelize, DataTypes) => {
  return sequelize.define('HistoriqueImportDonnees', {
    ID_HistoriqueImportDonnees: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    NomTable: { type: DataTypes.STRING(100), allowNull: false },
    NomFichierExcel: DataTypes.STRING(100),
    DateHeureImportation: DataTypes.DATE,
    DateHeureModificationFichier: DataTypes.DATE
  }, {
    tableName: 'HistoriqueImportDonnees',
    timestamps: false
  });
};
