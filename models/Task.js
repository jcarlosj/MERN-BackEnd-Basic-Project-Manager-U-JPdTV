const 
    mongoose = require( 'mongoose' ),
    TaskSchema = mongoose .Schema({
        name: {
            type: String,
            trim: true,
            required: true
        },
        state: {
            type: Boolean,
            default: false
        },
        project: {
            type: mongoose .Schema .Types .ObjectId,
            ref: 'Project'
        },
        createdDate: {
            type: Date,
            default: Date .now()
        }
    });

module .exports = mongoose .model( 'Task', TaskSchema );