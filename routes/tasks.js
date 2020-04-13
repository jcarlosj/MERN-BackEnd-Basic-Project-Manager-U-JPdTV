const 
    express = require( 'express' ),
    router = express .Router(),
    taskController = require( '../controllers/task.controller' );     // Controller

/** Obtiene todos los proyectos */
router .get(
    '/',        // Path
    taskController .getAll   // Run controller functionality
);

module .exports = router;