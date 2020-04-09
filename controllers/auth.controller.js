exports .authenticateUser = async ( request, response ) => {
    console .log( 'POST /api/auth' );

    response .json({
        success: true,
        method: 'POST',
        path: '/api/auth'
    });
}