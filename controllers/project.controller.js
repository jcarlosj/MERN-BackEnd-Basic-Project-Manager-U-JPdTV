const 
    Project = require( '../models/Project' ),     // Model  
    { validationResult } = require( 'express-validator' );  // Dependency

/** Crea un nuevo proyecto */
exports .create = async ( request, response ) => {
    console .log( 'POST /api/projects');

    const errors = validationResult( request );     // Implementa validacion a propiedades esperadas
    
    /** Verifica si hay Errores de Validacion */
    if( !errors .isEmpty() ) {
        return response .status( 400 ) .json({
            success: false,
            errors: errors .array()
        })
    }

    try {
        const project = new Project( request .body );   // Crea 'proyecto' usando el Modelo e inserta los datos.

        project .createBy = request .user .id;          // Asigna el ID usuario en la petición para indicar el creador del proyecto
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