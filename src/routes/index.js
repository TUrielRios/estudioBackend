const { Router } = require('express');
const empleadosRoutes = require('./empleadosRoutes');
const dataRoutes = require('./dataRoutes');
const obrasRoutes = require('./obrasRoutes')
const muralismosRoutes = require('./muralismosRoutes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const app = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
app.use('/empleados', empleadosRoutes);
app.use('/data', dataRoutes);
app.use('/obras', obrasRoutes);
app.use('/muralismos', muralismosRoutes);


module.exports = app;
