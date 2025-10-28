module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Prestataires', {
    ID_Prestataires: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    RaisonSociale: { type: DataTypes.STRING(200), allowNull: false },
    SIRET: DataTypes.STRING(100),
    Adresse: DataTypes.STRING(200),
    Tel: DataTypes.STRING(50),
    adresseMail: DataTypes.STRING(50),
    IdentifiantSAP: DataTypes.STRING(50),
    IdentifiantAPI: DataTypes.STRING(50),
    ClientIDProduction: DataTypes.STRING(100),
    ClientSecretProduction: DataTypes.STRING(100),
    ScopeProduction: DataTypes.STRING(100),
    UrlTokenProduction: DataTypes.STRING(200),
    UrlRequeteProduction: DataTypes.STRING(200),
    ContentTypeProduction: DataTypes.STRING(50),
    ClientIDSandBox: DataTypes.STRING(100),
    ClientSecretSandBox: DataTypes.STRING(100),
    ScopeSandBox: DataTypes.STRING(100),
    UrlTokenSandBox: DataTypes.STRING(200),
    UrlRequeteSandBox: DataTypes.STRING(200),
    ContentTypeSandBox: DataTypes.STRING(50),
    APICrypte: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'Prestataires',
    timestamps: false
  });
};
