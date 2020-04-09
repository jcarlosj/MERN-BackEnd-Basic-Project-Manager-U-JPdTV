const 
    express = require( 'express' ),
    router = express .Router(),
    projectController = require( '../controllers/project.controller' );     // Controller

/** api/auth */
router .post( '/', projectController .create );

module .exports = router;