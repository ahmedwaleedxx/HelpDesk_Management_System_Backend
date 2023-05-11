const {Schema, model} = require('mongoose');

const ArticleCommentSchema = new Schema({
    Owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    Comment: {
        type: String,
        required: true
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

module.exports = model('ArticleComment', ArticleCommentSchema);
