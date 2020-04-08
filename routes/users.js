const 
    express = require( 'express' ),
    router = express .Router(),
    userController = require( '../controllers/user.controller' );

/** api/users */
router .get( '/', userController .getUsers );

module .exports = router;