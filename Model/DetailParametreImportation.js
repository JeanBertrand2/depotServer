module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DetailParametreImportation', {
    ID_DetailParametreImportation: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ID_ParametreImportation: { type: DataTypes.INTEGER, allowNull: false },
    NumRubrique: DataTypes.INTEGER,
    NomRubriqueWindev: DataTypes.STRING(100),
    LibelleColonneWindev: DataTypes.STRING(100),
    NomColonneFichier: DataTypes.STRING(100),
    LibelleColonneFichier: DataTypes.STRING(100)
  }, {
    tableName: 'DetailParametreImportation',
    timestamps: false
  });
};
