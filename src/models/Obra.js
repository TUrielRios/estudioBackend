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
    posicion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    año: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagenes: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Cambiado a ARRAY de STRING
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
    metrosSemicubiertos: {
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