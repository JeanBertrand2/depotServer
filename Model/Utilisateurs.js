module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Utilisateurs', {
    ID_Utilisateurs: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Login: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    MotDePasse: { type: DataTypes.STRING(100), allowNull: false },
    Nom: DataTypes.STRING(100),
    Prenoms: DataTypes.STRING(100),
    adresseMail: DataTypes.STRING(50)
  }, {
    tableName: 'Utilisateurs',
    timestamps: false
  });
};

