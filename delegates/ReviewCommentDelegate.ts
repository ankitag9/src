import Coral                                                = require('Coral');
import q                                                    = require('q');
import ReviewComment                                        = require('../models/ReviewComment');

class ReviewCommentDelegate extends Coral.BaseDaoDelegate
{
    constructor() { super(ReviewComment); }
}
export = ReviewCommentDelegate