import Coral                                                = require('Coral');
import q                                                    = require('q');
import BookLink                                             = require('../models/BookLink');

class BookLinkDelegate extends Coral.BaseDaoDelegate
{
    constructor() { super(BookLink); }
}
export = BookLinkDelegate