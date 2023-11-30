const express = require('express');
const { Muralismo } = require('../db');
const muralismosRoutes = express.Router();
const multer = require('multer');
const fs = require('fs').promises;

// Configuración de Multer para manejar múltiples archivos
// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/muralismos'); // Carpeta donde se almacenarán los archivos subidos
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo almacenado
    },
});
const upload = multer({ storage: storage });

// Ruta para obtener todas las obras
muralismosRoutes.get('/', async (req, res) => {
    try {
        const muralismos = await Muralismo.findAll();
        res.status(200).json(muralismos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las muralismos' });
    }
});

// Ruta para obtener una obra por su ID
muralismosRoutes.get('/:id', async (req, res) => {
    const muralId = req.params.id;

    try {
        const mural = await Muralismo.findByPk(muralId);

        if (mural) {
        res.status(200).json(mural);
        } else {
        res.status(404).json({ error: 'mural no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener mural' });
    }
});

// Ruta para crear una nueva obra
muralismosRoutes.post('/', upload.array('imagenes', 5), async (req, res) => {
    // Verifica si se proporcionó algún archivo
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No se ha proporcionado ningún archivo.' });
    }

    const { nombre, json_data } = req.body;
    const imagenes = req.files.map((file) => file.path);

    // Obtiene el contenido del archivo JSON si se proporcionó
    const jsonData = json_data ? JSON.parse(json_data) : null;

    try {
        const nuevoMural = await Muralismo.create({
            nombre: jsonData.nombre,
            imagenes: imagenes
        });

        res.status(201).json(nuevoMural);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear un mural' });
    }
});

// Ruta para actualizar una obra por su ID
muralismosRoutes.put('/:id', async (req, res) => {
    const muralId = req.params.id;
    const { nombre, imagenes } = req.body;

    try {
        const mural = await Muralismo.findByPk(muralId);

        if (mural) {
        await mural.update({
            nombre,
            imagenes
        });

        res.status(200).json(mural);
        } else {
        res.status(404).json({ error: 'Mural no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar mural' });
    }
});

// Ruta para eliminar una obra por su ID
muralismosRoutes.delete('/:id', async (req, res) => {
    const muralId = req.params.id;

    try {
        const mural = await Muralismo.findByPk(muralId);

        if (mural) {
        await mural.destroy();
        res.status(204).send(); // No Content
        } else {
        res.status(404).json({ error: 'Mural no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar mural' });
    }
});

module.exports = muralismosRoutes;
