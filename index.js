const 
    express = require( 'express' ),         // Importa Express
    app = express(),                        // Asigna Express al inicio de la app
    PORT = process .env .PORT || 4000,      // Define variable de entorno
    ConnectDatabase = require( './config/db' ), // Configuración Conexión Base de Datos Mongo Atlas
    cors = require( 'cors' );               // Permite Cross-Origin Resource Sharing

/** Middlewares */
app .use( cors() );     // Habilita transferencias de datos entre navegadores y servidores.
app .use( express .json({ extended: true }));           // Habilita uso de JSON (Obliga enviar 'Content-Type':'application/json' el header de la petición)
app .use( '/api/users', require( './routes/users' ) );  // Define Rutas para API
app .use( '/api/auth', require( './routes/auth' ) );
app .use( '/api/projects', require( './routes/projects' ) );
app .use( '/api/tasks', require( './routes/tasks' ) );

/** Conexión a BD Mongo Atlas */
ConnectDatabase();

/** Lanza el Servidor */
app .listen( PORT, error => {
    if ( error ) throw new Error( error ) ;
    console .log( `Server run on http://localhost:${ PORT }` );
});