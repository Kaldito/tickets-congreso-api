// ---------- IMPORTS ---------- //
const express = require('express');
const router = express.Router();
const connectDB = require('../models/connection');

// ---------- MODELS ---------- //
const Ticket = require('../models/ticketSchema');

// PATH PARA LA PETICION: http://localhost:3001/registro

// ---------- GET ALL TICKETS ---------- //
router.get('/', async (req, res) => {
  // - Devuelve todos los registros de la coleccion Ticket ordenados por fecha de creacion de forma descendente
  // ----- CONNECT TO DB ----- //
  await connectDB();

  // ----- GET ALL TICKETS ----- //
  const tickets = await Ticket.find({}).sort({ createdAt: -1 });

  res.set('Content-Type', 'application/json');
  res.status(200).json(tickets);
  res.end();
});

// ---------- GET TICKET BY MATRICULA ---------- //
router.get('/:matricula', async (req, res) => {
  // - Devuelve todos los registros de la coleccion Ticket que coincidan con la matricula
  // ----- CONNECT TO DB ----- //
  await connectDB();

  // ----- GET TICKET BY MATRICULA ----- //
  const tickets = await Ticket.find({ matricula: req.params.matricula });

  res.set('Content-Type', 'application/json');
  res.status(200).json(tickets);
  res.end();
});

// ---------- POST TICKET ---------- //
router.post('/', async (req, res) => {
  // - Crea un nuevo registro en la coleccion Ticket con los parametros recibidos
  // - Todos los parametros son requeridos
  // ----- BODY PARAMS ----- //
  const { matricula, nombre, apellidos, carrera } = req.body;

  // ----- CONNECT TO DB ----- //
  await connectDB();

  if (matricula && nombre && apellidos && carrera) {
    // ----- CREATE TICKET ----- //
    const ticket = new Ticket({
      matricula: matricula,
      nombre: nombre,
      apellidos: apellidos,
      carrera: carrera,
    });

    await ticket.save();

    res.set('Content-Type', 'application/json');
    res.status(201).json({ message: 'Registro creado' });
    res.end();
  } else {
    res.set('Content-Type', 'application/json');
    res.status(400).json({ message: 'Faltan parámetros' });
    res.end();
  }
});

// ---------- PUT TICKET ---------- //
router.put('/', async (req, res) => {
  // - Actualizan los registros en la coleccion Ticket con los parametros recibidos
  // - Se puede actualizar por _id o matricula
  // - Si se actualiza por _id, se ignora la matricula
  // - Si se quiere actualizar todos los registros con la misma matricula, se debe enviar la matricula pero no el _id
  // ----- BODY PARAMS ----- //
  const { _id, matricula, nombre, apellidos, carrera } = req.body;

  // ----- CONNECT TO DB ----- //
  await connectDB();

  // ----- UPDATE OBJECT ----- //
  const update = {};

  if (nombre) {
    update.nombre = nombre;
  }

  if (apellidos) {
    update.apellidos = apellidos;
  }

  if (carrera) {
    update.carrera = carrera;
  }

  // ----- UPDATE TICKET BY MATRICULA ----- //
  const match = {};

  if (_id) {
    match._id = _id;
  } else if (matricula) {
    match.matricula = matricula;
  }

  if (_id || matricula) {
    const ticket = await Ticket.find(match);

    if (ticket.length > 0) {
      await Ticket.updateMany(match, update);

      res.set('Content-Type', 'application/json');
      res.status(200).json({ message: 'Registro actualizado' });
      res.end();
    } else {
      res.set('Content-Type', 'application/json');
      res.status(404).json({ message: 'Registro no encontrado' });
      res.end();
    }
  } else {
    res.set('Content-Type', 'application/json');
    res.status(400).json({ message: 'Falta el parámetro matricula o _id' });
    res.end();
  }
});

// ---------- DELETE TICKET ---------- //
router.delete('/', async (req, res) => {
  // - Elimina los registros en la coleccion Ticket con los parametros recibidos
  // - Se puede eliminar por _id o matricula
  // - Si se elimina por _id, se ignora la matricula
  // - Si se quiere eliminar todos los registros con la misma matricula, se debe enviar la matricula pero no el _id
  // ----- BODY PARAMS ----- //
  const { _id, matricula } = req.body;

  // ----- CONNECT TO DB ----- //
  await connectDB();

  // ----- DELETE TICKET BY MATRICULA ----- //
  const match = {};

  if (_id) {
    match._id = _id;
  } else if (matricula) {
    match.matricula = matricula;
  }

  if (_id || matricula) {
    const ticket = await Ticket.find(match);

    if (ticket.length > 0) {
      await Ticket.deleteMany(match);

      res.set('Content-Type', 'application/json');
      res.status(200).json({ message: 'Registro(s) eliminado' });
      res.end();
    } else {
      res.set('Content-Type', 'application/json');
      res.status(404).json({ message: 'Registro(s) no encontrado' });
      res.end();
    }
  } else {
    res.set('Content-Type', 'application/json');
    res.status(400).json({ message: 'Falta el parámetro matricula o _id' });
    res.end();
  }
});

module.exports = router;
