const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumnoSchema = new Schema(
  {
    matricula: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    a_paterno: {
      type: String,
      required: true,
    },
    a_materno: {
      type: String,
      required: true,
    },
    carrera: {
      type: String,
      required: true,
    },
    asist: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Alumno', alumnoSchema);
