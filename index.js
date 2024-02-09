// ----------- IMPORTS ------------ //
const express = require('express');
const app = express();
const port = 3001;

// ----------- SETUP DEL SERVER ------------ //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------- RUTAS ------------ //
const registro = require('./routes/registro');

// ----------- MIDDLEWARES ------------ //
app.use('/registro', registro);

// ----------- SERVIDOR ------------ //
// - Inicializar el servidor con: nodemon --env-file=.env index.js para que tome las variables de entorno
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
