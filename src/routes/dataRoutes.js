const express = require('express');
const dataRoutes = express.Router();
const { Data } = require('../db');


// Ruta para obtener todas las instancias de Data
dataRoutes.get('/', async (req, res) => {
  try {
    const data = await Data.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Ruta para obtener una instancia de Data por su ID
dataRoutes.get('/:id', async (req, res) => {
  const dataId = req.params.id;

  try {
    const dataInstance = await Data.findByPk(dataId);

    if (dataInstance) {
      res.status(200).json(dataInstance);
    } else {
      res.status(404).json({ error: 'Datos no encontrados' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Ruta para crear una nueva instancia de Data
dataRoutes.post('/', async (req, res) => {
    const { telefono, mail, password, ubicacion } = req.body;

  try {
    const newDataInstance = await Data.create({
      telefono: telefono,
      mail: mail,
      password: password,
      ubicacion: ubicacion,
    });

    res.status(201).json(newDataInstance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear nuevos datos' });
  }
});

// Ruta para actualizar una instancia de Data por su ID
dataRoutes.put('/:id', async (req, res) => {
  const dataId = req.params.id;
  const { telefono, mail, password, ubicacion, logo, curiosidad } = req.body;

  try {
    const dataInstance = await Data.findByPk(dataId);

    if (dataInstance) {
      await dataInstance.update({
        telefono,
        mail,
        password,
        ubicacion,
        logo,
        curiosidad,
      });

      res.status(200).json(dataInstance);
    } else {
      res.status(404).json({ error: 'Datos no encontrados' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar los datos' });
  }
});

// Ruta para eliminar una instancia de Data por su ID
dataRoutes.delete('/:id', async (req, res) => {
  const dataId = req.params.id;

  try {
    const dataInstance = await Data.findByPk(dataId);

    if (dataInstance) {
      await dataInstance.destroy();
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ error: 'Datos no encontrados' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar los datos' });
  }
});

module.exports = dataRoutes;
