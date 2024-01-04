// routes/empleados.js
const express = require('express');
const empleadosRoutes = express.Router();
const { Empleado } = require('../db');

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
empleadosRoutes.post('/',  async (req, res) => {
    try {
    
        const { nombre_completo, cargo, cedula_a, cedula_b, foto } = req.body;
        console.log('Datos del JSON:', nombre_completo, cargo, cedula_a, cedula_b, foto);
  
  
      // Resto de la lógica para crear el empleado utilizando jsonData y req.file
      const nuevoEmpleado = await Empleado.create({
        nombre_completo: nombre_completo,
        cargo: cargo,
        foto: foto, // Utiliza la URL segura proporcionada por Cloudinary,
        cedula_a: cedula_a,
        cedula_b: cedula_b,
        // También puedes incluir campos adicionales según sea necesario
      });
  
      res.status(201).json(nuevoEmpleado);
    } catch (error) {
      console.error(error); 
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
  empleadosRoutes.put('/:id', async (req, res) => {
    const empleadoId = req.params.id;
    const { nombre_completo, cargo, foto, cedula_a, cedula_b } = req.body;
  
    try {
      const empleado = await Empleado.findByPk(empleadoId);
  
      if (!empleado) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
  
      // Actualizar los datos del empleado
      empleado.nombre_completo = nombre_completo;
      empleado.cargo = cargo;
      empleado.foto = foto;
      empleado.cedula_a = cedula_a;
      empleado.cedula_b = cedula_b;
  
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
