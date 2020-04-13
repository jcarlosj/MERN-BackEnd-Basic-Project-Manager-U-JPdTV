const 
    express = require( 'express' ),
    router = express .Router(),
    taskController = require( '../controllers/task.controller' ),     // Controller
    auth = require( '../middlewares/auth' ),      // Middleware
    { check } = require( 'express-validator' );   // Dependency

/** PATH: api/tasks */

/** Nueva tarea */
router .post( 
    '/',        // Path
    [ auth ],   // Middleware de autenticación
    [           // Validation of express-validator fields
        check( 'project', 'Nombre del proyecto es obligatorio' ) .not() .isEmpty(),
        check( 'name', 'Nombre de la tarea es obligatorio' ) .not() .isEmpty()
    ],
    taskController .create   // Run controller functionality
);

/** Obtiene todos los proyectos */
router .get(
    '/',        // Path
    taskController .getAll   // Run controller functionality
);

module .exports = router;