module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Communes', {
    ID_Communes: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    CodeINSEE: { type: DataTypes.STRING(10), allowNull: false, unique: true },
    CodePostal: { type: DataTypes.STRING(5), allowNull: false },
    Commune: { type: DataTypes.STRING(200), allowNull: false },
    CodeCommune: DataTypes.STRING(5),
    CodeDepartement: DataTypes.STRING(5)
  }, {
    tableName: 'Communes',
    timestamps: false
  });
};
