module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ReferencePrestation', {
    ID_ReferencePrestation: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Code: { type: DataTypes.STRING(20), allowNull: false },
    Libelle: { type: DataTypes.STRING(150), allowNull: false }
  }, {
    tableName: 'ReferencePrestation',
    timestamps: false
  });
};
