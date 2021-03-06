const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
 
// Referencia al Modelo donde vamos a autenticar
const Usuarios = require('../models/Usuarios');
 
// local strategy - Login con credenciales propios (usuario y password)
passport.use(
     new LocalStrategy(
          {
               usernameField: 'email',
               passwordField: 'password'
          },
          async(email, password, done) => {
               try {
                    const usuario = await Usuarios.findOne({
                         where: {email : email}
                    });
                    //El usuario existe pero el password es incorrecto
                    if(!usuario.verificarPassword(password)){
                         return done(null, false, {
                              message: 'Password incorrecto'
                         })
                    }
                    //El email existe y el password es correcto
                    return done(null, usuario);
               } catch (error) {
                    //Ese usuario no existe
                    return done(null, false, {
                         message: 'Esa cuenta no existe'
                    })
               }
          }
     )
);

//Serializar usuarios
passport.serializeUser((usuario, callback)=>{
     callback(null, usuario);
})
//Deserializar usuario
passport.deserializeUser((usuario, callback)=>{
     callback(null, usuario);
});

module.exports = passport;