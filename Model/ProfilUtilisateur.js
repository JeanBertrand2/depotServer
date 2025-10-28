module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ProfilUtilisateur', {
    ID_ProfilUtilisateur: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    LibelleProfil: { type: DataTypes.STRING(100), allowNull: false, unique: true }
  }, {
    tableName: 'ProfilUtilisateur',
    timestamps: false
  });
};
