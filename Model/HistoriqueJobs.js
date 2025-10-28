module.exports = (sequelize, DataTypes) => {
  return sequelize.define('HistoriqueJobs', {
    ID_HistoriqueJObs: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    NomJOB: DataTypes.STRING(50),
    StatutJOB: DataTypes.STRING(50),
    DateHeureDemande: DataTypes.DATE,
    DateHeureTraitement: DataTypes.DATE,
    NombreFacturesTraitees: DataTypes.DECIMAL(4, 2),
    NombreFacturesDemandees: DataTypes.DECIMAL(4, 2),
    ID_Utilisateurs: DataTypes.INTEGER,
    MessageErreur: DataTypes.STRING(8)
  }, {
    tableName: 'HistoriqueJobs',
    timestamps: false
  });
};

