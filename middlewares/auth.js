const jwt = require( 'jsonwebtoken' );

module .exports = ( request, response, next ) => {
    const token = request .header( 'x-auth-token' );    // 1. Obtiene Token del header
    
    if( ! token ) {     // 2. Valida si NO existe Token
        console .log( 'Ops! No hay Token. Permiso no válido! );
        response .status( 401 ) .json({
            sucess: false, 
            message: 'Ops! No hay Token. Permiso no válido!'
        });
    }
    
    try {
        const data = jwt .verify( token, process .env .SECRET );    // 3. Validate if the token match
        
        request .user = data .user;         // Agrega los datos a la petición
        console .log( 'Token Verificado. Permiso de Autenticación válido' );
        next();                             // Inicia ejecución del siguiente Middleware

    } catch ( error ) {
        console .log( error );
        response .status( 401 ) .json({
            sucess: false, 
            message: 'Ops! Token no válido. Permiso denegado!'
        });
    }

}