module.exports = (sequelize, DataTypes) => {
  return sequelize.define('utilisateursPrestataires', {
    ID_UtilisateursPrestataires: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ID_Utilisateurs: { type: DataTypes.INTEGER, allowNull: false },
    ID_Prestataires: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'utilisateursPrestataires',
    timestamps: false
  });
};
