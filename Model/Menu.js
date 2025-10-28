module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Menu', {
    ID_Menu: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    LibelleMenu: { type: DataTypes.STRING(50), allowNull: false },
    Visible: { type: DataTypes.BOOLEAN, defaultValue: true },
    NomMenu: DataTypes.STRING(200)
  }, {
    tableName: 'Menu',
    timestamps: false
  });
};
