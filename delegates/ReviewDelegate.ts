import Coral                                                = require('Coral');
import q                                                    = require('q');
import Review                                               = require('../models/Review');

class ReviewDelegate extends Coral.BaseDaoDelegate
{
    constructor() { super(Review); }
}
export = ReviewDelegate