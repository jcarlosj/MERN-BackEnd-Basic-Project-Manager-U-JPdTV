const 
    express = require( 'express' ),         // Importa Express
    app = express(),                        // Asigna Express al inicio de la app
    PORT = process .env .PORT || 4000,      // Define variable de entorno
    ConnectDatabase = require( './config/db' ); // Configuración Conexión Base de Datos Mongo Atlas

/** Define Rutas */
app .get( '/', ( request, response ) => {
    response .send( "Project Manager te saluda :)" );
});

/** Conexión a BD Mongo Atlas */
ConnectDatabase();

/** Lanza el Servidor */
app .listen( PORT, error => {
    if ( error ) throw new Error( error ) ;
    console .log( `Server run on http://localhost:${ PORT }` );
});