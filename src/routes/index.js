const { Router } = require('express');
const empleadosRoutes = require('./empleadosRoutes');
const dataRoutes = require('./dataRoutes');
const obrasRoutes = require('./obrasRoutes')
const muralismosRoutes = require('./muralismosRoutes')
const emailRoutes = require('./emailRoutes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const app = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
app.use('/empleados', empleadosRoutes);
app.use('/data', dataRoutes);
app.use('/obras', obrasRoutes);
app.use('/muralismos', muralismosRoutes);
app.use('/send-email', emailRoutes)


module.exports = app;
