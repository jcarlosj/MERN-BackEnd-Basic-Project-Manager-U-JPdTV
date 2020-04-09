const 
    express = require( 'express' ),
    router = express .Router(),
    { check } = require( 'express-validator' ),                     // Dependency
    userController = require( '../controllers/user.controller' );   // Controller

/** api/users */
router .get( '/', userController .getUsers );
router .post( 
    '/',        // Path
    [           // Validation of express-validator fields
        check( 'name', 'Valor obligatorio' ) .not() .isEmpty(),
        check( 'email', 'Debe ser valido' ) .isEmail(),
        check( 'password', 'Longitud mínima 6 caracteres' ) .isLength({ min: 6 })
    ], 
    userController .createUser // Run controller functionality
);

module .exports = router;