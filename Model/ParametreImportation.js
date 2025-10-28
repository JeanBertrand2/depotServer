module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ParametreImportation', {
    ID_ParametreImportation: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    NomTable: { type: DataTypes.STRING(100), allowNull: false },
    NomParametre: { type: DataTypes.STRING(100), allowNull: false }
  }, {
    tableName: 'ParametreImportation',
    timestamps: false
  });
};
