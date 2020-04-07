const mongoose = require( 'mongoose' );
require( 'dotenv' ) .config({ path: '.env' });

const ConnectDatabase = async () => {
    try {
        await mongoose .connect( 
            process .env .DB_MONGO, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        );
        console .log( 'Connected Mongo Atlas database' );
    } catch ( error ) {
        console .log( error );
        process .exit( 1 );     // Detiene la app
    }
}

module .exports = ConnectDatabase;