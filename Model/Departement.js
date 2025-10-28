module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Departement', {
    ID_Departement: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    codeDepartement: { type: DataTypes.STRING(5), allowNull: false, unique: true },
    nomDepartement: { type: DataTypes.STRING(100), allowNull: false },
    chefLieu: DataTypes.STRING(100)
  }, {
    tableName: 'Departement',
    timestamps: false
  });
};

