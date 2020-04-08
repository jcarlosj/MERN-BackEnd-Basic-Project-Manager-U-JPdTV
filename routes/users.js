const 
    express = require( 'express' ),
    router = express .Router(),
    userController = require( '../controllers/user.controller' );

/** api/users */
router .get( '/', userController .getUsers );
router .post( '/', userController .createUser );

module .exports = router;