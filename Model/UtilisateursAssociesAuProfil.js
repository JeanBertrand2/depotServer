module.exports = (sequelize, DataTypes) => {
  return sequelize.define('UtilisateursAssociesAuProfil', {
    ID_UtilisateursAssociesAuProfil: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ID_Utilisateurs: { type: DataTypes.INTEGER, allowNull: false },
    ID_ProfilUtilisateur: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'UtilisateursAssociesAuProfil',
    timestamps: false
  });
};
