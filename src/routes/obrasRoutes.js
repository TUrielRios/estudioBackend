const express = require('express');
const { Obra } = require('../db');
const obrasRoutes = express.Router();
const multer = require('multer');
const fs = require('fs').promises;

// Configuración de Multer para manejar múltiples archivos
// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Carpeta donde se almacenarán los archivos subidos
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo almacenado
    },
});
const upload = multer({ storage: storage });

// Ruta para obtener todas las obras
obrasRoutes.get('/', async (req, res) => {
    try {
        const obras = await Obra.findAll();
        res.status(200).json(obras);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las obras' });
    }
});

// Ruta para obtener una obra por su ID
obrasRoutes.get('/:id', async (req, res) => {
    const obraId = req.params.id;

    try {
        const obra = await Obra.findByPk(obraId);

        if (obra) {
        res.status(200).json(obra);
        } else {
        res.status(404).json({ error: 'Obra no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la obra' });
    }
});

// Ruta para crear una nueva obra
obrasRoutes.post('/',upload.array('imagenes', 10), async (req, res) => {
    const { nombre, año, finalidades, superficie, lugar, estado, json_data } = req.body;
    const imagenes = req.files.map((file) => file.path);

    // Verifica si se proporcionó algún archivo
    if (!req.files || req.files.length === 0) {
        throw new Error('No se ha proporcionado ningún archivo.');
    }

        // Obtiene el contenido del archivo JSON si se proporcionó
        const jsonData = json_data ? JSON.parse(json_data) : null;
    try {
        const nuevaObra = await Obra.create({
        nombre: jsonData.nombre,
        año: jsonData.año,
        finalidades: jsonData.finalidades,
        superficie: jsonData.superficie,
        lugar: jsonData.lugar,
        estado: jsonData.estado,
        imagenes: imagenes
        });

        res.status(201).json(nuevaObra);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear una nueva obra' });
    }
});

// Ruta para actualizar una obra por su ID
obrasRoutes.put('/:id', async (req, res) => {
    const obraId = req.params.id;
    const { nombre, año, finalidades, superficie, lugar, estado, imagenes } = req.body;

    try {
        const obra = await Obra.findByPk(obraId);

        if (obra) {
        await obra.update({
            nombre,
            año,
            finalidades,
            superficie,
            lugar,
            estado,
            imagenes,
        });

        res.status(200).json(obra);
        } else {
        res.status(404).json({ error: 'Obra no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la obra' });
    }
});

// Ruta para eliminar una obra por su ID
obrasRoutes.delete('/:id', async (req, res) => {
    const obraId = req.params.id;

    try {
        const obra = await Obra.findByPk(obraId);

        if (obra) {
        await obra.destroy();
        res.status(204).send(); // No Content
        } else {
        res.status(404).json({ error: 'Obra no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la obra' });
    }
});

module.exports = obrasRoutes;
