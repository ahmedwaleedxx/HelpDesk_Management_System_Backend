const articleService = require('../services/articles');
const jwt = require('jsonwebtoken');

module.exports.getArticles = async (req, res) => {
    try {
        const articles = await articleService.GetArticles();
        return res.send({articles});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.postArticle = async (req, res) => {
    const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
    const articleInfo = {
        title: req.body.title,
        content: req.body.content,
        Owner : userId
      };
      try {
        const createdArticle = await articleService.WriteAnArticle(articleInfo);
        return res.status(201).send({
        msg: 'Article created successfully.',
       // articleId: createdArticle._id
        });
      } catch (err) {
        return res.status(500).send({
          error: err.message
        });
      }
}









module.exports.updateArticle = async (req, res) => {
    const articleId = req.params.id;
    const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
    
        const title= req.body.title;
        const content= req.body.content;
    try {
        const updatedArticle = await articleService.UpdateAnArticle(articleId, title, content, userId);   
        return res.status(201).send({
            msg: 'Article updated successfully.',
            //articleId: updatedArticle._id
        });
    } catch (err) {
        return res.status(500).send({
            error: err.message
        });
    }
    
}







module.exports.deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        await articleService.deleteArticle(articleId);
        return res.send({ message: "Article deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}


module.exports.getArticle = async (req, res) => {
    const articleID = req.params.id;
    try {
      const article = await articleService.GetArticle(articleID);
      if (!article) {
        return res.status(404).send({
          error: 'Article not found.'
        });
      }
      return res.send({
        article : article
      });
    } catch (err) {
      res.status(500).send({
        error: err.message
      });
    }
}


module.exports.addComment = async (req, res) => {
    const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
    

      try {
        const Article= req.params.id;
        const Comment = req.body.Comment;

        const createdArticle = await articleService.AddACommentOnTheArticle(Comment, userId, Article);
        return res.status(201).send({
        msg: 'Article Comment created successfully.',
       // articleId: createdArticle._id
        });
      } catch (err) {
        return res.status(500).send({
          error: err.message
        });
      }

}


module.exports.GetArticleComments = async (req, res) => {
    try {
        const articleID = req.params.id;
        const comments = await articleService.GetArticleComments(articleID);
        return res.send({comments});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.updateComment = async (req, res) => {
    try {
        
        const comment = req.body.Comment;
        const articleid = req.params.id;
        const commentId = req.params.cid;
        const userid = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
        await articleService.EditACommentOnTheArticle(comment, articleid, userid, commentId);
        res.status(201).send({ message: "Comment updated successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports.deleteComment = async (req, res) => {
    try {
        const articleID = req.params.id;
        const commentId = req.params.cid;
        await articleService.DeleteACommentOnTheArticle(articleID,commentId);
        return res.send({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}


module.exports.addLike = async (req, res) => {
    const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
    try {
        const articleID = req.params.id;
        await articleService.AddALikeOnTheArticle(articleID, userId);
        return res.send({ message: "Like added successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports.deleteLike = async (req, res) => {
    const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
    try {
        const articleID = req.params.id;
        await articleService.DeleteALikeOnTheArticle(articleID, userId);
        return res.send({ message: "Like deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports.addDislike = async (req, res) => {
    const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
    try {
        const articleID = req.params.id;
        await articleService.AddADislikeOnTheArticle(articleID, userId);
        return res.send({ message: "Dislike added successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports.deleteDislike = async (req, res) => {
    const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
    try {
        const articleID = req.params.id;
        await articleService.DeleteADislikeOnTheArticle(articleID, userId);
        return res.send({ message: "Dislike deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

