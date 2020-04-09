exports .createProject = async ( request, response ) => {
    console .log( 'POST /api/projects');

    response .json({
        success: true,
        method: 'POST',
        path: '/api/projects'
    });
}