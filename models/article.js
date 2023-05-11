const {Schema, model} = require('mongoose');
//const comment = require('./comment');

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    Owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },

    DateUploaded: {
        type: Date,
        default: Date.now
    },

    LastTimeUpdated: {
        type: Date,
        default: Date.now
    },

    
    Likes: {
        type: Number,
        default: 0
    },
    
    DisLikes: {
        type: Number,
        default: 0
    }
    
});

module.exports = model('Article', ArticleSchema);
