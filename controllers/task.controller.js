const 
    /** Models */
    Project = require( '../models/Project' ),       
    Task = require( '../models/Task' ),       
    { validationResult } = require( 'express-validator' );  // Dependency

/** Crea un nuevo proyecto */
exports .create = async ( request, response ) => {
    console .log( 'POST /api/tasks');

    const errors = validationResult( request );     // Implementa validacion a propiedades esperadas
    
    /** Verifica si hay Errores de Validacion */
    if( !errors .isEmpty() ) {
        return response .status( 400 ) .json({
            success: false,
            errors: errors .array()
        });
    }

    const { project } = request .body;          // Destructuring request .body

    try {
        
        const projectDB = await Project .findById( project );     // Busca proyecto por ID

        /** Valida si NO existe el proyecto */
        if( ! projectDB ) {
            return response .status( 404 ) .json({
                success: false,
                error: {
                    message: 'El proyecto no ha sido encontrado!'
                }
            });
        }

        /** Valida si NO coincide el usuario creador del proyecto */
        if( projectDB .createBy .toString() !== request .user .id ) {
            return response .status( 404 ) .json({
                success: false,
                error: {
                    message: 'Usuario no autorizado! No coincide con el creador del proyecto.'
                }
            });
        }

        const task = new Task( request .body );   // Crea 'tarea' usando el Modelo e inserta los datos.

        await task .save();    // Registra los datos el proyecto en MongoDB usando Mongoose.

        response .json({
            success: true,
            message: 'Tarea registrada correctamente!',
            task
        });

    } catch ( error ) {
        console .log( error );
        response .status( 500 ) .json({
            success: false,
            error: {
                message: 'La tarea no ha sido registrada!'
            }
        });
    }
}

/** Obtiene todas las tareas del proyecto seleccionado */
exports .getAll = async ( request, response ) => {
    console .log( 'GET /api/tasks');

    try {
        const 
            { project } = request .body,          // Destructuring request .body
            projectDB = await Project .findById( project );     // Busca proyecto por ID

        /** Valida si NO existe el proyecto */
        if( ! projectDB ) {
            return response .status( 404 ) .json({
                success: false,
                error: {
                    message: 'El proyecto no ha sido encontrado!'
                }
            });
        }

        /** Valida si NO coincide el usuario creador del proyecto */
        if( projectDB .createBy .toString() !== request .user .id ) {
            return response .status( 404 ) .json({
                success: false,
                error: {
                    message: 'Usuario no autorizado! No coincide con el creador del proyecto.'
                }
            });
        }

        const tasks = await Task .find({ project });  // Pasa como parámetro el ID del Proyecto al método de Mongoose.

        response .json({
            success: true,
            message: 'Tareas del proyecto obtenidas correctamente!',
            tasks
        });

    } catch ( error ) {
        console .log( error );
        response .status( 500 ) .json({
            success: false,
            error: {
                message: 'No se han podido obtener las tareas del proyecto!'
            }
        });
    }
}