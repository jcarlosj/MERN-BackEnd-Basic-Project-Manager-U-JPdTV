const 
    mongoose = require( 'mongoose' ),
    UserSchema = mongoose .Schema({
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true
        },
        password: {
            type: String,
            unique: true,
            trim: true,
            required: true
        },
        registrationDate: {
            type: Date,
            default: Date .now()
        }

    });

module .exports = mongoose .model( 'User', UserSchema );