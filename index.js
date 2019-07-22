const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

//Crear aplicacion de express
//Helpers
const helpers = require('./helpers');
//Crear conexion a la base de datos

const db = require('./config/db');
//Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch((error => console.log(error)));

const app = express();

//Referencia para cargar archivos estaticos

app.use(express.static('public'));

//Habilitar pug
app.set('view engine', 'pug');
//Carpeta de vistas
app.set('views', path.join(__dirname, './views'))

//Pasar el vardump

app.use((req, res, next) =>{
    res.locals.vardump = helpers.vardump;
    next();
});

//Habilitar body parser
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', routes() );


app.listen(3000);
