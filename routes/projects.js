const 
    express = require( 'express' ),
    router = express .Router(),
    projectController = require( '../controllers/project.controller' ),     // Controller
    auth = require( '../middlewares/auth' );      // Middleware

/** api/auth */
router .post( '/', [ auth ], projectController .create );

module .exports = router;