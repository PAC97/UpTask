const express = require("express");

const router = express.Router();
//Importar express validator
const {body} = require('express-validator');

//Importar el controlador
const proyectoController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');

module.exports = function() {
  router.get("/", proyectoController.proyectoHome);
  router.get("/nuevoProyecto", proyectoController.formularioProyecto);
  router.post("/nuevoProyecto",
    body('nombre').not().isEmpty().trim().escape()
    ,proyectoController.nuevoProyecto
  );

    router.get('/proyectos/:url', proyectoController.proyectoPorUrl);

    //Actualizar proyecto

    router.get('/proyecto/editar/:id', proyectoController.formularioEditar);
    router.post("/nuevoProyecto/:id",
    body('nombre').not().isEmpty().trim().escape()
    ,proyectoController.actualizarProyecto
  );
  //Eliminar proyecto
  router.delete('/proyectos/:url', proyectoController.eliminarProyecto);

  //Tareas
  router.post('/proyectos/:url', tareasController.agregarTarea);

  //Actualizar tarea
  router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
  //Eliminar tarea
  router.delete('/tareas/:id', tareasController.eliminarTarea);

  //Crear nueva cuenta
  router.get('/crear-cuenta', usuariosController.formCrearCuenta);
  router.post('/crear-cuenta', usuariosController.crearCuenta);
  return router;
}
