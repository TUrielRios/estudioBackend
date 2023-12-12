const express = require('express');
const { Obra } = require('../db');
const obrasRoutes = express.Router();
const multer = require('multer');
const fs = require('fs').promises;
const cloudinary = require('cloudinary').v2;
const hash = require('random-hash'); // you have to install this package:
const path = require('path');
const fsPromises = require('fs').promises;
          
cloudinary.config({ 
  cloud_name: 'dhiss395i', 
  api_key: '765213187315739', 
  api_secret: 'zG-oa_bay4_vqEOhiT7UcIdj89s' 
});

// Configuración de Multer para manejar múltiples archivos
// Configuración de multer
const storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    const destinationPath = path.resolve('Images');
    try {
      const rootPath = path.resolve('/var/task/src/routes');
 
      await fsPromises.mkdir(destinationPath, { recursive: true });
      callback(null, destinationPath);
    } catch (error) {
      console.error('Error al crear el directorio:', error);
      callback(error);
    }
  },

  filename: (req, file, callback) => { //this is just setting a unique filename
      let temp = file.originalname.split('.');
      const filename = temp[0] + '-' + hash.generateHash({length: 5}) + '.' + temp[1]
      callback(null, filename);
  }
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
obrasRoutes.post('/', upload.array('imagenes', 10), async (req, res) => {
    const { nombre, año, finalidades, superficie, lugar, estado, json_data } = req.body;
  
    // Verifica si se proporcionó algún archivo
    if (!req.files || req.files.length === 0) {
      throw new Error('No se ha proporcionado ningún archivo.');
    }
  
    // Obtiene el contenido del archivo JSON si se proporcionó
    const jsonData = json_data ? JSON.parse(json_data) : null;
  
    try {
      // Sube las imágenes a Cloudinary
      const cloudinaryUploadResults = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return result.secure_url;
        })
      );
      
      const nuevaObra = await Obra.create({
        nombre: jsonData.nombre,
        año: jsonData.año,
        finalidades: jsonData.finalidades,
        superficie: jsonData.superficie,
        lugar: jsonData.lugar,
        estado: jsonData.estado,
        imagenes: cloudinaryUploadResults,
      });
  
      // Elimina los archivos locales después de subirlos a Cloudinary
      await Promise.all(req.files.map((file) => fs.unlink(file.path)));
  
      res.status(201).json(nuevaObra);
    } catch (error) {
      console.error(error);
  
      // Elimina los archivos locales si ha ocurrido un error durante la creación de la obra
      await Promise.all(req.files.map((file) => fs.unlink(file.path)));
  
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
              // Verificar si se proporcionó una nueva imagen
      if  (!req.files || req.files.length === 0) {
        // Subir la nueva imagen a Cloudinary
      // Sube las imágenes a Cloudinary
      const cloudinaryUploadResults = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return result.secure_url;
        })
      );
        obra.imagenes = cloudinaryUploadResults.secure_url;
  
      // Elimina los archivos locales después de subirlos a Cloudinary
      await Promise.all(req.files.map((file) => fs.unlink(file.path)));
      }

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
