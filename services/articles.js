const article = require('../models/article');
const Article = require('../models/article');
const articleComment = require('../models/articleComment');
//const ArticleComment = require('../models/articleComment');


//Sha8aala
module.exports.GetArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        return articles;
    } catch (err) {
        throw new Error("Error while getting articles");
    }
}

//Sha8aala
module.exports.WriteAnArticle = async (articleInfo) => {
    try {
        // const { title, content, OwnerID } = articleInfo;

        const article = new Article({
            title: articleInfo.title,
            content: articleInfo.content,
            Owner: articleInfo.Owner
        });
        await article.save();
    } catch (err) {
        throw new Error("Error while creating article");
        //error=err.message;
    }
}

//Sha8aala
module.exports.GetArticle = async (articleId) => {
    try {
        const article = await Article.findOne({
         _id: articleId
        }).populate('Owner');
        return article;
      } catch (err) {
        throw new Error('Could not find Article.');
      }
}


module.exports.UpdateAnArticle = async (articleid, title, content, userID) => {

    const article = await Article.findOne ({
        _id: articleid
    });
    if (article) {
        article.title = title;
        article.content = content;
        article.Owner = userID;
        await article.save();
    } else {
        throw new Error("Article does not exist");
    }
}


    


module.exports.deleteArticle = async (articleId) => {
    try {
        await Article.deleteOne({ _id: articleId });
      } catch (err) {
        throw new Error('Could not remove Article.');
      }
   
}



module.exports.AddACommentOnTheArticle = async (commentmsg, userID, articleID) => {
    try {

        const comment = new articleComment({
            Comment: commentmsg,
            Article: articleID,
            Owner: userID
        });
        await comment.save();
    } catch (err) {
        throw new Error("Error while adding comment");

    }
}
    
module.exports.GetArticleComments = async (artid) => {
    try {
        const comment = await articleComment.find({
            Article : artid
        });
        return comment;
    } catch (err) {
        throw new Error("Error while getting comments");
    }
}



module.exports.EditACommentOnTheArticle = async (commentt, articleid, userid, commentid) => {
    const comment = await articleComment.findOne({
        _id: commentid,
    });

    if (comment) {
        comment.Comment = commentt;
        comment.Article = articleid;
        comment.Owner = userid;
        await comment.save();
    } else {
        throw new Error("Comment does not exist");
    }

}



module.exports.DeleteACommentOnTheArticle = async (articleID, commentID) => {
    try {
       const comment = await articleComment.findOne({
            _id: commentID,
            Article: articleID
        });
        if (comment) {
            await comment.remove();
        } else {
            throw new Error("Comment does not exist");
        }

    } catch (err) {
        throw new Error("Error while deleting comment");
    }
}



module.exports.AddALikeOnTheArticle = async (articleID) => {

    const article = await Article.findOne({
        _id: articleID
    });
    if (article) {
        article.Likes += 1;
        await article.save();
    } else {
        throw new Error("Article does not exist");
    }
}


module.exports.DeleteALikeOnTheArticle = async (articleID) => {
    const article = await Article.findOne({
        _id: articleID
    });
    if (article) {
        article.Likes -= 1;
        await article.save();
    } else {
        throw new Error("Article does not exist");
    }
}


module.exports.AddADislikeOnTheArticle = async (articleID) => {
    const article = await Article.findOne({
        _id: articleID
    });
    if (article) {
        article.DisLikes += 1;
        await article.save();
    } else {
        throw new Error("Article does not exist");
    }
}


module.exports.DeleteADislikeOnTheArticle = async (articleID) => {
    const article = await Article.findOne({
        _id: articleID
    });
    if (article) {
        article.DisLikes -= 1;
        await article.save();
    } else {
        throw new Error("Article does not exist");
    }
}