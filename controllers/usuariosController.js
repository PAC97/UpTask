const Usuarios = require('../models/Usuarios');
exports.formCrearCuenta = (req, res) =>{
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en UpTask'
    })
}

exports.formIniciarSesion = (req, res) =>{
    const {error} = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesion en UpTask',
        error
    })
}

exports.crearCuenta = async (req, res) => {
    //Leer los datos
    const {email, password} = req.body;

    try {
        await   Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion')
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear Cuenta en UpTask',
            email,
            password
        })
    }

}

exports.formReestablecer = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu contraseña',
    })
}