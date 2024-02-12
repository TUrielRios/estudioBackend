const express = require('express');
const { Obra } = require('../db');
const obrasRoutes = express.Router();
        
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
obrasRoutes.post('/', async (req, res) => {
    const { nombre, año, finalidades, superficie, lugar, estado,imagenes, metrosSemicubiertos, posicion} = req.body;
  
  
    try {

      const nuevaObra = await Obra.create({
        nombre: nombre,
        posicion: posicion,
        año: año,
        finalidades: finalidades,
        superficie: superficie,
        metrosSemicubiertos: metrosSemicubiertos,
        lugar: lugar,
        estado: estado,
        imagenes: imagenes,
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
    const { nombre, año, finalidades, superficie, lugar, estado, imagenes, metrosSemicubiertos, posicion } = req.body;

    try {
        const obra = await Obra.findByPk(obraId);

        if (obra) {
        await obra.update({
            nombre,
            posicion,
            año,
            finalidades,
            superficie,
            metrosSemicubiertos,
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