exports .getUsers = ( request, response ) => {
    console .log( 'GET /api/users' );
    console .log( '    userController.getUsers' );
}

exports .createUser = ( request, response ) => {
    console .log( 'POST /api/users' );
    console .log( request .body );
}

    