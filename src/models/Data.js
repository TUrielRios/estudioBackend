const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Data', {
        telefono: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
            isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ubicacion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        logo: {
            type: DataTypes.STRING, // Tipo BLOB para almacenar archivos binarios largos
            allowNull: true,
        },
        curiosidad: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    // Otros campos según tus necesidades
    }

    )
}