import Coral                                                = require('Coral');
import q                                                    = require('q');
import Book                                          = require('../models/Book');

class BookDelegate extends Coral.BaseDaoDelegate
{
    constructor() { super(Book); }
}
export = BookDelegate