const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Obra', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    año: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagenes: {
      type: DataTypes.STRING, // Puedes cambiar el tipo de datos según tus necesidades
      allowNull: true,
    },
    finalidades: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    superficie: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lugar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM('En Construcción', 'Terminado'),
      allowNull: true,
    },
  });
};