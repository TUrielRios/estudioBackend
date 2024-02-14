const express = require('express');
const nodemailer = require('nodemailer');
const emailRoutes = express.Router();


// Configuración del transporte Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Puedes usar otros servicios o configurar SMTP según tus necesidades
    auth: {
        user: 'defranciscoestudio@gmail.com',
        pass: 'pmod kgvm ujif sndr',
    },
});

// Ruta para obtener todas las obras
emailRoutes.post('/', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    // Configuración del correo electrónico de notificación al equipo
    const mailOptionsEquipo = {
        from: 'defranciscoestudio@gmail.com',
        to: 'defranciscoestudio@gmail.com',
        subject: `Nuevo mensaje de ${nombre}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
            <p style="font-size: 18px; color: #333;">Nuevo mensaje de ${nombre}</p>
            <div style="border-top: 2px solid #ddd; margin: 15px 0;"></div>
            <p style="font-size: 16px; color: #555; margin-top: 15px;"><strong>Nombre:</strong> ${nombre}</p>
            <p style="font-size: 16px; color: #555;"><strong>Correo Electrónico:</strong> ${email}</p>
            <div style="border-top: 2px solid #ddd; margin: 15px 0;"></div>
            <p style="font-size: 16px; color: #555;"><strong>Mensaje:</strong></p>
            <p style="font-size: 16px; color: #555;">${mensaje}</p>
        </div>
    `,
    };

    // Configuración del correo electrónico de respuesta automática al remitente
    const mailOptionsRespuesta = {
        from: 'defranciscoestudio@gmail.com',
        to: email,
        subject: 'Gracias por tu mensaje, ' + nombre,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; color: #000; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <p style="font-size: 16px;">Hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto.</p>
        <br/>
        <p style="font-size: 14px;">Atentamente, equipo de Francisco.</p>
        <div style="text-align: left;">
            <img src="https://res.cloudinary.com/dhiss395i/image/upload/v1707703217/hkku2bbrl4t5jskxankl.jpg" alt="Estudio De francisco" style="max-width: 30%; height: auto; margin: 20px 0; border-radius: 5px;">
        </div>
    </div>
    
    `,

    };

    // Enviar el correo electrónico de notificación al equipo
    transporter.sendMail(mailOptionsEquipo, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }

        // Enviar el correo electrónico de respuesta automática al remitente
        transporter.sendMail(mailOptionsRespuesta, (errorRespuesta) => {
            if (errorRespuesta) {
                return res.status(500).send(errorRespuesta.toString());
            }

            res.status(200).send('Mensaje enviado con éxito');
        });
    });
});

module.exports = emailRoutes;
