const 
    express = require( 'express' ),
    router = express .Router(),
    { check } = require( 'express-validator' ),                     // Dependency
    authController = require( '../controllers/auth.controller' );   // Controller

/** api/auth */
router .post( 
    '/',        // Path
    [           // Validation of express-validator fields
        check( 'email', 'Debe ser valido' ) .isEmail(),
        check( 'password', 'Longitud mínima 6 caracteres' ) .isLength({ min: 6 })
    ], 
    authController .authenticateUser // Run controller functionality
);

module .exports = router;