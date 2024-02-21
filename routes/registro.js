// ---------- IMPORTS ---------- //
const express = require('express');
const router = express.Router();
const connectDB = require('../models/connection');

// ---------- MODELS ---------- //
const Alumno = require('../models/alumnoSchema');

// PATH PARA LA PETICION: http://localhost:3001/registro

// ---------- GET ALL ALUMNOS ---------- //
router.get('/', async (req, res) => {
  // - Devuelve todos los registros de la coleccion Alumno ordenados por fecha de creacion de forma descendente
  // ----- CONNECT TO DB ----- //
  await connectDB();

  // ----- GET ALL ALUMNOS ----- //
  const alumnos = await Alumno.find({}).sort({ createdAt: -1 });

  res.set('Content-Type', 'application/json');
  res.status(200).json(alumnos);
  return res.end();
});

// ---------- GET ALUMNO BY MATRICULA ---------- //
router.get('/:matricula', async (req, res) => {
  // - Devuelve todos los registros de la coleccion Alumno que coincidan con la matricula
  // ----- CONNECT TO DB ----- //
  await connectDB();

  // ----- GET TICKET BY MATRICULA ----- //
  const alumnos = await Alumno.find({ matricula: req.params.matricula });

  res.set('Content-Type', 'application/json');
  res.status(200).json(alumnos);
  return res.end();
});

// ---------- POST TICKET ---------- //
router.post('/', async (req, res) => {
  // - Crea un nuevo registro en la coleccion Alumno con los parametros recibidos
  // - Todos los parametros son requeridos
  // ----- BODY PARAMS ----- //
  const { matricula, nombre, a_paterno, a_materno, carrera } = req.body;

  // ----- CONNECT TO DB ----- //
  await connectDB();

  // ----- VALIDAR TODOS LOS PARAMETROS ----- //
  if (!matricula || !nombre || !a_paterno || !a_materno || !carrera) {
    res.set('Content-Type', 'application/json');
    res.status(400).json({ message: 'Faltan parámetros' });
    return res.end();
  }

  // ----- CREATE ALUMNO ----- //
  const alumno = new Alumno({
    matricula: matricula,
    nombre: nombre,
    a_paterno: a_paterno,
    a_materno: a_materno,
    carrera: carrera,
  });

  await alumno.save();

  res.set('Content-Type', 'application/json');
  res.status(201).json({ message: 'Registro creado' });
  return res.end();
});

// ---------- PUT ALUMNO ---------- //
router.put('/', async (req, res) => {
  // - Actualizan los registros en la coleccion Alumno con los parametros recibidos
  // - Se puede actualizar por _id o matricula
  // - Si se actualiza por _id, se ignora la matricula
  // - Si se quiere actualizar todos los registros con la misma matricula, se debe enviar la matricula pero no el _id
  // ----- BODY PARAMS ----- //
  const { _id, matricula, nombre, a_paterno, a_materno, carrera } = req.body;

  // ----- CONNECT TO DB ----- //
  await connectDB();

  // ----- UPDATE OBJECT ----- //
  const update = {};

  if (nombre) {
    update.nombre = nombre;
  }

  if (a_paterno) {
    update.a_paterno = a_paterno;
  }

  if (a_materno) {
    update.a_materno = a_materno;
  }

  if (carrera) {
    update.carrera = carrera;
  }

  // ----- UPDATE ALUMNO BY MATRICULA ----- //
  const match = {};

  if (_id) {
    match._id = _id;
  } else if (matricula) {
    match.matricula = matricula;
  }

  if (_id || matricula) {
    const alumno = await Alumno.find(match);

    if (alumno.length > 0) {
      await Alumno.updateMany(match, update);

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

// ---------- DELETE  ALUMNO ---------- //
router.delete('/', async (req, res) => {
  // - Cambia la asistencia de un alumno a false
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
    const ticket = await Alumno.find(match);

    if (ticket.length > 0) {
      await Alumno.updateMany(match, { asist: false });

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
