const express = require("express");

const router = express.Router();
//Importar express validator
const {body} = require('express-validator');

//Importar el controlador
const proyectoController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = function() {
  router.get("/", 
    authController.usuarioAutenticado,
    proyectoController.proyectoHome
    );
  router.get("/nuevoProyecto",
    authController.usuarioAutenticado,
    proyectoController.formularioProyecto
  );
  router.post("/nuevoProyecto",
    authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape()
    ,proyectoController.nuevoProyecto
  );

    router.get('/proyectos/:url',
      authController.usuarioAutenticado,
      proyectoController.proyectoPorUrl
    );

    //Actualizar proyecto

    router.get('/proyecto/editar/:id',
      authController.usuarioAutenticado,
      proyectoController.formularioEditar
    );
    router.post("/nuevoProyecto/:id",
    authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape()
    ,proyectoController.actualizarProyecto
  );
  //Eliminar proyecto
  router.delete('/proyectos/:url',
    authController.usuarioAutenticado,
    proyectoController.eliminarProyecto
  );

  //Tareas
  router.post('/proyectos/:url',
    authController.usuarioAutenticado,
    tareasController.agregarTarea
  );

  //Actualizar tarea
  router.patch('/tareas/:id',
    authController.usuarioAutenticado,
    tareasController.cambiarEstadoTarea
  );
  //Eliminar tarea
  router.delete('/tareas/:id',
    authController.usuarioAutenticado,
    tareasController.eliminarTarea
  );

  //Crear nueva cuenta
  router.get('/crear-cuenta', usuariosController.formCrearCuenta);
  router.post('/crear-cuenta', usuariosController.crearCuenta);
  router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
  router.post('/iniciar-sesion', authController.autenticarUsuario);
  //Cerrar Sesion
  router.get('/cerrar-sesion', authController.cerrarSesion);
  //Reestablecer contraseña
  router.get('/reestablecer', usuariosController.formReestablecer);
  return router;
}
