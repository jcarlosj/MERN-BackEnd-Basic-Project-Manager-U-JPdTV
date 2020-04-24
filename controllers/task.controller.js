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
            { project } = request .query,                       // Destructuring request .query cuando se ha pasado valores GET usando la propiedad params
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

        const tasks = await Task 
                                .find({ project })            // Pasa como parámetro el ID del Proyecto al método de Mongoose.
                                .sort({ createdDate: -1 });   // asc o 1, desc o -1

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

/** Actualiza tareas de un proyecto de un usuario autenticado */
exports .update = async ( request, response ) => {
    console .log( 'PUT /api/tasks');

    try {

        const 
            { project, name, state } = request .body,          // Destructuring request .body
            taskDB = await Task .findById( request .params .id );     // Busca proyecto por ID

        /** Valida si NO existe la tarea */
        if( ! taskDB ) {
            return response .status( 404 ) .json({
                success: false,
                error: {
                    message: 'La tarea no ha sido encontrada!'
                }
            });
        }

        const projectDB = await Project .findById( project );     // Pasa como parámetro el ID proyecto al método de Mongoose.
        
        /** Valida si NO coincide el usuario creador del proyecto */
        if( projectDB .createBy .toString() !== request .user .id ) {
            return response .status( 404 ) .json({
                success: false,
                error: {
                    message: 'Usuario no autorizado! No coincide con el creador del proyecto.'
                }
            });
        }

        const newTask = {};

        /** Valida propiedad reciba un valor */
        if( name ) {
            newTask .name = name;
        }
        if( state ) {
            newTask .state = state;
        }

        /** Actualiza Tarea */
        const task = await Task .findOneAndUpdate({ _id: request .params .id }, newTask, { new: true });      // Pasa como parámetro el ID de la Tarea al método de Mongoose.

        response .json({
            success: true,
            message: 'Tarea de proyecto actualizada correctamente!',
            task
        });

    } catch ( error ) {
        console .log( error );
        response .status( 500 ) .json({
            success: false,
            error: {
                message: 'No se ha podido actualizar la tarea del proyecto!'
            }
        });
    }
}

/** Elimina un proyecto del usuario actual */
exports .delete = async ( request, response ) => {
    console .log( 'DELETE /api/tasks');

    try {

        const 
            { project } = request .query,          // Destructuring request .query cuando se ha pasado valores GET usando la propiedad params
            taskDB = await Task .findById( request .params .id );     // Busca proyecto por ID

        /** Valida si NO existe la tarea */
        if( ! taskDB ) {
            return response .status( 404 ) .json({
                success: false,
                error: {
                    message: 'La tarea no ha sido encontrada!'
                }
            });
        }

        const projectDB = await Project .findById( project );     // Pasa como parámetro el ID proyecto al método de Mongoose.
        
        /** Valida si NO coincide el usuario creador del proyecto */
        if( projectDB .createBy .toString() !== request .user .id ) {
            return response .status( 404 ) .json({
                success: false,
                error: {
                    message: 'Usuario no autorizado! No coincide con el creador del proyecto.'
                }
            });
        }

        /** Elimina Tarea */
        const task = await Task .findOneAndRemove({ _id: request .params .id });      // Pasa como parámetro el ID de la Tarea al método de Mongoose.

        response .json({
            success: true,
            message: 'Tarea de proyecto eliminada correctamente!',
            task
        });

    } catch ( error ) {
        console .log( error );
        response .status( 500 ) .json({
            success: false,
            error: {
                message: 'No se ha podido eliminar la tarea del proyecto!'
            }
        });
    }
    
}