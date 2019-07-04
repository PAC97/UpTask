const Proyectos = require('../models/Proyectos');

exports.proyectoHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render("index", {
      nombrePagina: 'Proyectos',
      proyectos
    });
  }

exports.formularioProyecto = (req, res) => {
    res.render("nuevoProyecto", {
      nombrePagina: 'Nuevo Proyecto'
    });
  }

  exports.nuevoProyecto = async (req, res) => {
    //Enviar a consola respuesta del formulario
    /* console.log(req.body); */

    //Validar input

    const{ nombre } = req.body;

    let errores = [];

    if(!nombre){
      errores.push({'texto': 'Agrega nombre al proyecto'})
    }

    //Si hay errores
    if(errores.length > 0){
      res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        errores
      })
    }else{
      //No hay errores insertar en la base de datos
      
      const proyecto = await Proyectos.create({nombre});
      res.redirect('/');
        
    }
  }
