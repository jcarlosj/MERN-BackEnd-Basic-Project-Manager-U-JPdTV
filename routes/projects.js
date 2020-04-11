const 
    express = require( 'express' ),
    router = express .Router(),
    projectController = require( '../controllers/project.controller' ),     // Controller
    auth = require( '../middlewares/auth' ),      // Middleware
    { check } = require( 'express-validator' );   // Dependency

/** api/auth */
router .post( 
    '/',        // Path
    [ auth ],   // Middleware de autenticación
    [           // Validation of express-validator fields
        check( 'name', 'Nombre del proyecto es obligatorio' ) .not() .isEmpty(),
    ],
    projectController .create   // Run controller functionality
);

module .exports = router;