const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Muralismo', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagenes: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Puedes cambiar el tipo de datos según tus necesidades
      allowNull: true,
    }
  });
};
