module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pays', {
    ID_Pays: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nomPays: { type: DataTypes.STRING(100), allowNull: false },
    codePays: { type: DataTypes.STRING(10), allowNull: false }
  }, {
    tableName: 'Pays',
    timestamps: false
  });
};
