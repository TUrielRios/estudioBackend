// routes/empleados.js
const express = require('express');
const empleadosRoutes = express.Router();
const { Empleado } = require('../db');
const multer = require('multer');
const fs = require('fs').promises;
const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'dhiss395i', 
  api_key: '765213187315739', 
  api_secret: 'zG-oa_bay4_vqEOhiT7UcIdj89s' 
});

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

// Obtener todos los empleados
empleadosRoutes.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
});

//Crear nuevo empleado
empleadosRoutes.post('/', upload.single('foto'), async (req, res) => {
    try {
        console.log('Body:', req.body);
        console.log('File:', req.file);
    
        const { nombre_completo, cargo, cedula_a, cedula_b, json_data } = req.body;
        console.log('Datos del JSON:', nombre_completo, cargo, cedula_a, cedula_b, json_data);
    
      // Verifica si se proporcionó el archivo
      if (!req.file) {
        throw new Error('No se ha proporcionado ningún archivo.');
      }
  
      // Obtiene el contenido del archivo JSON si se proporcionó
      const jsonData = json_data ? JSON.parse(json_data) : null;
      
      //subir a cloudinary
      const cloudinaryUploadResult = await cloudinary.uploader.upload(req.file.path);
  
      // Resto de la lógica para crear el empleado utilizando jsonData y req.file
      const nuevoEmpleado = await Empleado.create({
        nombre_completo: jsonData.nombre_completo,
        cargo: jsonData.cargo,
        foto: cloudinaryUploadResult.secure_url, // Utiliza la URL segura proporcionada por Cloudinary,
        cedula_a: jsonData.cedula_a,
        cedula_b: jsonData.cedula_b,
        // También puedes incluir campos adicionales según sea necesario
      });
  
      res.status(201).json(nuevoEmpleado);
    } catch (error) {
      console.error(error);
  
      // Elimina el archivo si ha ocurrido un error durante la creación del empleado
      if (req.file) {
        await fs.unlink(req.file.path);
      }
  
      res.status(500).json({ error: 'Error al crear un nuevo empleado' });
    }
  });

// Obtener un empleado por ID
empleadosRoutes.get('/:id', async (req, res) => {
    const empleadoId = req.params.id;
  
    try {
      const empleado = await Empleado.findByPk(empleadoId);
  
      if (!empleado) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
  
      res.json(empleado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el empleado' });
    }
  });
  
  // Actualizar un empleado por ID
  empleadosRoutes.put('/:id', upload.single('foto'), async (req, res) => {
    const empleadoId = req.params.id;
    const { nombre_completo, cargo, cedula_a, cedula_b } = req.body;
  
    try {
      const empleado = await Empleado.findByPk(empleadoId);
  
      if (!empleado) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
  
      // Actualizar los datos del empleado
      empleado.nombre_completo = nombre_completo;
      empleado.cargo = cargo;
      empleado.cedula_a = cedula_a;
      empleado.cedula_b = cedula_b;

  
      // Verificar si se proporcionó una nueva imagen
      if (req.file) {
        // Subir la nueva imagen a Cloudinary
        const cloudinaryUploadResult = await cloudinary.uploader.upload(req.file.path);
        empleado.foto = cloudinaryUploadResult.secure_url;
  
        // Eliminar el archivo local después de subirlo a Cloudinary
        await fs.unlink(req.file.path);
      }
  
      await empleado.save();
  
      res.json(empleado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el empleado' });
    }
  });
  // Eliminar un empleado por ID
  empleadosRoutes.delete('/:id', async (req, res) => {
    const empleadoId = req.params.id;
  
    try {
      const empleado = await Empleado.findByPk(empleadoId);
  
      if (!empleado) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
  
      await empleado.destroy();
  
      res.json({ mensaje: 'Empleado eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el empleado' });
    }
  });
  

module.exports = empleadosRoutes;
