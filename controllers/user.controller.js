const User = require( '../models/User' );

exports .getUsers = ( request, response ) => {
    console .log( 'GET /api/users' );
    console .log( '    userController.getUsers' );
}

exports .createUser = async ( request, response ) => {
    console .log( 'POST /api/users' );
    
    const { email, password } = request .body;      // Destructuring 

    try {
        let user = await User .findOne({ email });  // Query using Mongoose

        /** Validate if user already exists */
        if( user ) {
            return response .status( 400 ) .json({
                success: false,
                message: 'El usuario ya existe!'
            });
        }

        user = new User( request .body );   // Crea 'usuario' usando el Modelo e inserta los datos.
        await user .save();                 // Registra los datos del usuario en MongoDB usando Mongoose.

        response .json({
            success: true,
            message: 'Usuario registrado correctamente!'
        });

    } catch ( error ) {
        console .log( error );
        response .status( 400 ) .json({
            success: false,
            error: {
                message: 'El usuario no ha podido ser registrado!'
            }
        });
    }
}

    