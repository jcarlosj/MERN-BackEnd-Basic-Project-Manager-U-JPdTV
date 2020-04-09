const 
    Project = require( '../models/Project' );     // Model

exports .create = async ( request, response ) => {
    console .log( 'POST /api/projects');

    try {
        const project = new Project( request .body );   // Crea 'proyecto' usando el Modelo e inserta los datos.
        project .save();    // Registra los datos el proyecto en MongoDB usando Mongoose.

        response .json({
            success: true,
            message: 'Proyecto registrado correctamente!',
            project
        });

    } catch ( error ) {
        console .log( error );
        response .status( 500 ) .json({
            success: false,
            error: {
                message: 'El projecto no ha sido registrado!'
            }
        });
    }
}