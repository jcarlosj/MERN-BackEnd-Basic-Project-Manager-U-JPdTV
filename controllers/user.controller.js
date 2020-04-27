const 
    User = require( '../models/User' ),     // Model
    /** Dependencies */ 
    bcrypt = require( 'bcryptjs' ),
    { validationResult } = require( 'express-validator' ),
    jwt = require( 'jsonwebtoken' );

exports .getUsers = ( request, response ) => {
    console .log( 'GET /api/users' );
    console .log( '    userController.getUsers' );
}

exports .createUser = async ( request, response ) => {
    console .log( 'POST /api/users' );

    const errors = validationResult( request );     // Implementa validacion a propiedades esperadas
    
    /** Verifica si hay Errores de Validacion */
    if( !errors .isEmpty() ) {
        return response .status( 400 ) .json({
            success: false,
            errors: errors .array()
        })
    }

    const { email, password } = request .body;      // Destructuring 

    try {
        let user = await User .findOne({ email });  // Query using Mongoose

        /** Validate if user already exists */
        if( user ) {
            return response .status( 400 ) .json({
                success: false,
                error: {
                    message: 'El usuario ya existe!'
                }
            });
        }

        const salt = await bcrypt .genSalt( 10 );

        user = new User( request .body );   // Crea 'usuario' usando el Modelo e inserta los datos.
        user .password = await bcrypt .hash( password, salt );  // Encripta la contraseña
        await user .save();                 // Registra los datos del usuario en MongoDB usando Mongoose.

        /** Data que llevará el Token */
        const payload = {
            user: {
                id: user .id                // ID Registrado en MongoDB
            }
        }
        /** Crea Firma de Verificación del Token */
        jwt .sign(                         
            payload,                        // Información
            process .env .SECRET,           // String
            {                               // Configuración del Token
                expiresIn: 3600             // 1 hora
            },
            ( error, token ) => {           // CallBack 
                if( error ) throw error;

                response .json({
                    success: true,
                    message: 'Usuario registrado correctamente!',
                    token
                });
            }
        );

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

    