import Coral                                                = require('Coral');
import q                                                    = require('q');
import UserProfile                                          = require('../models/UserProfile');

class UserProfileDelegate extends Coral.BaseDaoDelegate
{
    constructor() { super(UserProfile); }
}
export = UserProfileDelegate