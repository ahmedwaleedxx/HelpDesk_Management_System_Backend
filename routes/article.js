const {Router} = require('express');

const articleController = require('../controllers/articles');

const articlaValidator = require('../validators/article');

const articleRouter = Router();

const articleComment = require('../models/articleComment');

const isAuthenticated = require('../middleware/auth');
const isSupportAgent = require('../middleware/supportAgent');




articleRouter.post('/postArticle',isSupportAgent,articleController.postArticle);
articleRouter.get('/getArticle/:id', articleController.getArticle);
articleRouter.get('/getArticles', articleController.getArticles);
  
articleRouter.put('/updateArticle/:id', isSupportAgent ,articleController.updateArticle);
articleRouter.delete('/deleteArticle/:id',isSupportAgent, articleController.deleteArticle);

articleRouter.post('/addComment/:id', isAuthenticated,articleController.addComment);
articleRouter.put('/updateComment/:id/:cid', isAuthenticated,articleController.updateComment);
articleRouter.get('/getArticleComments/:id', articleController.GetArticleComments);
articleRouter.delete('/deleteComment/:id/:cid',isAuthenticated, articleController.deleteComment);

articleRouter.post('/likeArticle/:id', isAuthenticated,articleController.addLike);
articleRouter.post('/dislikeArticle/:id', isAuthenticated,articleController.addDislike);

articleRouter.delete('/deleteLike/:id', isAuthenticated,articleController.deleteLike);
articleRouter.delete('/deleteDislike/:id', isAuthenticated,articleController.deleteDislike);

module.exports = articleRouter;




