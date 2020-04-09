const 
    express = require( 'express' ),
    router = express .Router(),
    authController = require( '../controllers/auth.controller' );   // Controller

/** api/auth */
router .post( 
    '/',        // Path 
    authController .authenticateUser // Run controller functionality
);

module .exports = router;