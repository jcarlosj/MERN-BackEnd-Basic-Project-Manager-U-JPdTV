const 
    express = require( 'express' ),
    router = express .Router(),
    projectController = require( '../controllers/project.controller' ),     // Controller
    auth = require( '../middlewares/auth' ),      // Middleware
    { check } = require( 'express-validator' );   // Dependency

/** PATH: api/auth */

/** Nuevo proyecto */
router .post( 
    '/',        // Path
    [ auth ],   // Middleware de autenticación
    [           // Validation of express-validator fields
        check( 'name', 'Nombre del proyecto es obligatorio' ) .not() .isEmpty(),
    ],
    projectController .create   // Run controller functionality
);

/** Obtiene todos los proyectos */
router .get(
    '/',        // Path
    [ auth ],   // Middleware de autenticación
    projectController .getAll   // Run controller functionality
);

/** Actualiza proyecto del usuario actual */
router .put(
    '/:id',     // Path: ID del Proyecto
    [ auth ],   // Middleware de autenticación
    [           // Validation of express-validator fields
        check( 'name', 'Nombre del proyecto es obligatorio' ) .not() .isEmpty(),
    ],
    projectController .update   // Run controller functionality
);

/** Elimina proyecto del usuario actual */
router .delete(
    '/:id',     // Path: ID del Proyecto
    [ auth ],   // Middleware de autenticación
    projectController .delete   // Run controller functionality
);

module .exports = router;