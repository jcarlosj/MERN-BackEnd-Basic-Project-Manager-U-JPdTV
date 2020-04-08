const 
    express = require( 'express' ),
    router = express .Router();

/** api/ */
router .get( '/', () => {
    console .log( 'GET api' );
});

/** api/users */
router .get( '/users', () => {
    console .log( 'GET api/users' );
});

module .exports = router;