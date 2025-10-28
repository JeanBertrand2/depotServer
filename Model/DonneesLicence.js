module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DonneesLicence', {
    ID_DonneesLicence: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    NomPoste: DataTypes.STRING(150),
    CleInitiale: DataTypes.STRING(8),
    DateInstallation: DataTypes.STRING(8),
    DateDerniereUtilisation: DataTypes.STRING(8),
    DateExpirationLicence: DataTypes.STRING(8),
    NombreJourFlottant: DataTypes.STRING(8),
    CleActivation: DataTypes.STRING(150)
  }, {
    tableName: 'DonneesLicence',
    timestamps: false
  });
};

