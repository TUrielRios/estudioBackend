// models/Empleado.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Empleado', {
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    posicion: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    cargo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    foto: {
        type: DataTypes.STRING, // Tipo BLOB para almacenar archivos binarios largos
        allowNull: true,
    },
    cedula_a: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cedula_b: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Otros campos según tus necesidades
    });
}

