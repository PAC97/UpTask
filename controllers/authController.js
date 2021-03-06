const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//Funcion para verificar si el usuario esta autenticado o no
exports.usuarioAutenticado = (req, res, next) =>{
    //si el usuario esta autenticado adelante
    if(req.isAuthenticated()){
        return next();
    }
    //si no estad autenticado redirigir al formulario
    return res.redirect('/iniciar-sesion');
}

exports.cerrarSesion = (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion');
    })
}