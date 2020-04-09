const 
    mongoose = require( 'mongoose' ),
    ProjectSchema = mongoose .Schema({
        name: {
            type: String,
            trim: true,
            required: true
        },
        createBy: {
            type: mongoose .Schema .Types .ObjectId,
            ref: 'User'
        },
        createdDate: {
            type: Date,
            default: Date .now()
        }

    });

module .exports = mongoose .model( 'Project', ProjectSchema );