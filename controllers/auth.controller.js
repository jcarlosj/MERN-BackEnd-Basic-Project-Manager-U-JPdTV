const 
    User = require( '../models/User' ),     // Model
    /** Dependencies */ 
    bcrypt = require( 'bcryptjs' ),
    { validationResult } = require( 'express-validator' ),
    jwt = require( 'jsonwebtoken' );

exports .authenticateUser = async ( request, response ) => {
    console .log( 'POST /api/auth' );

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

        /** Validate if the user does not exist */
        if( ! user ) {
            return response .status( 400 ) .json({
                success: false,
                message: 'El usuario NO existe!'
            });
        }

        const passwordMatch = await bcrypt .compare( password, user .password );

        /** Validate if the password does not match */
        if( ! passwordMatch ) {
            return response .status( 400 ) .json({
                success: false,
                message: 'La contraseña es incorrecta.'
            });
        }

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
                    message: 'Usuario autenticado correctamente!',
                    token
                });
            }
        );

    } catch ( error ) {
        
    }
}