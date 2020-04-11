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
        });
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
                message: 'El proyecto no ha sido registrado!'
            }
        });
    }
}

/** Obtiene todos los proyectos del usuario actual */
exports .getAll = async ( request, response ) => {
    console .log( 'GET /api/projects');

    try {
        const projects = await Project .find({ createBy: request .user .id }) .sort({ createdDate: -1 });  // Pasa como parámetro el ID usuario al método de Mongoose.

        response .json({
            success: true,
            message: 'Proyectos obtenidos correctamente!',
            projects
        });

    } catch ( error ) {
        console .log( error );
        response .status( 500 ) .json({
            success: false,
            error: {
                message: 'No se han podido obtener los proyectos del usuario!'
            }
        });
    }
}

/** Actualiza datos de un proyecto del usuario actual */
exports .update = async ( request, response ) => {
    console .log( 'PUT /api/projects');

    const errors = validationResult( request );     // Implementa validacion a propiedades esperadas
    
    /** Verifica si hay Errores de Validacion */
    if( !errors .isEmpty() ) {
        return response .status( 400 ) .json({
            success: false,
            errors: errors .array()
        });
    }

    const 
        { name } = request .body,     // Extrae propiedades usando Destructuración
        newProject = {};

    /** Valida propiedad reciba un valor */
    if( name ) {
        newProject .name = name;
    }

    try {
        // Obtener ID del proyecto pasado como parámetro
        let project = await Project .findById( request .params .id );     // Pasa como parámetro el ID proyecto al método de Mongoose.

        /** Valida si NO existe el proyecto */
        if( ! project ) {
            return response .status( 404 ) .json({
                success: false,
                error: {
                    message: 'El proyecto no ha sido encontrado!'
                }
            });
        }
        
        /** Valida si NO coincide el usuario creador del proyecto */
        if( project .createBy .toString() !== request .user .id ) {
            return response .status( 404 ) .json({
                success: false,
                error: {
                    message: 'Usuario no autorizado! No coincide con el creador del proyecto.'
                }
            });
        }

        /** Actualiza Proyecto */
        project = await Project .findByIdAndUpdate({ _id: request .params .id }, { $set: newProject }, { new: true });

        response .json({
            success: true,
            message: 'Proyecto actualizado correctamente!',
            project
        });

    } catch ( error ) {
        console .log( error );
        response .status( 500 ) .json({
            success: false,
            error: {
                message: 'El proyecto no ha sido actualizado!'
            }
        });
    }
}