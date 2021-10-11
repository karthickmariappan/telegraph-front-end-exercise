const express = require('express');
const router = express.Router();
const commentsApi = require('./service/commentsApi');

/**
 * Function to fetch the comments from API
 *
 * @param {Boolean} doSort
 *          Optional flag to sort the comments fetched from API
 */
async function _getComments(doSort){
    let comments;
    try{
        comments = await commentsApi.getComments();

        if(doSort) {
            // Sorting the comments array in descending order of the number of likes
            comments.sort(function(comment1,comment2) {return comment2.getLikes() - comment1.getLikes();});
        }
    }catch(error){
        console.log(`Error while making call to get comments from CommentsApi. The error message is ${error.message}`);
    }finally{
        return comments;
    }
}

/**
 * Function to put togther the associated comments and trigger response
 * @param {Object} req
 *          The Request object
 * @param {Object} res
 *          The Response object
 * @param {boolean} doSort
 *          The boolean flag to determin sorting of comments
 */
async function triggerResponse(req, res, doSort){
    let comments = await _getComments(doSort);

	res.render("home", {
		meta: req.app.get('meta'),
        comments: comments
	});
}

router.get('/', async (req, res) => {
    triggerResponse(req, res, false);
});

router.get('/sort', async (req, res) => {
    triggerResponse(req, res, true);
});

module.exports = router;
