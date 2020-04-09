const 
    express = require( 'express' ),
    router = express .Router(),
    projectController = require( '../controllers/project.controller' );     // Controller

/** api/auth */
router .post( '/', projectController .createProject );

module .exports = router;