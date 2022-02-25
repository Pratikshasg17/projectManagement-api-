const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    reason:{
        type: String,
        required: true,
        trim: true
    },
    type:{
        type: String,
        required: true,
        trim: true
    },
    division:{
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    department:{
        type: String,
        required: true,
        trim: true
    },
    location:{
        type: String,
        required: true,
        trim: true
    },
    priority:{
        type: String,
        required: true,
        trim: true
    },
    startdate:{
        type: Date,
        required: true,
        min: Date.now
    },
    enddate:{
        type: Date,
        required: true,
        min: Date.now
    },
    status:{
        type: String,
        required: true,
        trim: true
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
