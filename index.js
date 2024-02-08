const express = require('express');
const app = express();
const port = 3001;

const registro = require('./routes/registro');

app.use('/registro', registro);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});