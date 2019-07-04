const express = require("express");

const router = express.Router();
//Importar express validator
const {body} = require('express-validator');

//Importar el controlador
const proyectoController = require('../controllers/proyectosController');

module.exports = function() {
  router.get("/", proyectoController.proyectoHome);
  router.get("/nuevoProyecto", proyectoController.formularioProyecto);
  router.post("/nuevoProyecto", 
    body('nombre').not().isEmpty().trim().escape()
    ,proyectoController.nuevoProyecto);
  return router;
}
