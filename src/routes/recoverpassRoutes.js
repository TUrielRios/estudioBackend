const express = require('express');
const nodemailer = require('nodemailer');
const recoverpassRoutes = express.Router();

// Configuración del transporte Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Puedes usar otros servicios o configurar SMTP según tus necesidades
    auth: {
        user: 'equipodemail12@gmail.com',
        pass: 'dpsf wdxx koai cgfv',
    },
});

// Ruta para obtener todas las obras
recoverpassRoutes.post('/', async (req, res) => {

        const response = await fetch('https://estudio-backend-ti3p.vercel.app/data');
        const data = await response.json();
        console.log('Data from API:', data);
        console.log("password", data[0].password)

        const contraseña = data[0].password;

        // Configuración del correo electrónico de notificación al equipo
        const mailOptionsEquipo = {
            from: 'equipodemail12@gmail.com',
            to: 'equipodemail12@gmail.com',
            subject: `Recuperación de contraseña`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                <div style="border-top: 2px solid #ddd; margin: 15px 0;"></div>
                <p style="font-size: 16px; color: #555; margin-top: 15px;"><strong>Su contraseña es ${contraseña}</strong></p>
                <div style="border-top: 2px solid #ddd; margin: 15px 0;"></div>
                <p style="font-size: 16px; color: #555; margin-top: 15px;"><strong>Ingresá y podrás modificar tu contraseña.</strong></p>
                <p style="font-size: 16px; color: #555; margin-top: 15px;"><strong>Atentamente, Equipo de Administración.</strong></p>
            </div>
        `,
        };


    // Enviar el correo electrónico de notificación al equipo
    transporter.sendMail(mailOptionsEquipo, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Mensaje enviado con éxito');
    });
});

module.exports = recoverpassRoutes;
