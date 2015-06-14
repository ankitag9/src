import Coral                                                = require('Coral');
import q                                                    = require('q');
import Book                                          = require('../models/Book');
import Config                                      = require('../common/Config');
import _                                      = require('underscore');

class BookDelegate extends Coral.BaseDaoDelegate
{
    private imageDelegate = new Coral.ImageDelegate();

    constructor() { super(Book); }

    processBookImage(bookId:number, tempImagePath:string):q.Promise<any>
    {
        var self = this;
        var imageBasePath:string = Config.get(Config.UPLOAD_PATH) + bookId;
        var sizes = [Coral.ImageSize.LARGE,Coral.ImageSize.MEDIUM, Coral.ImageSize.SMALL];

        return q.all(_.map(sizes, function (size:Coral.ImageSize):q.Promise<any>
            {
                return self.imageDelegate.resize(tempImagePath, imageBasePath + '_' + Coral.ImageSize[size].toLowerCase(), size);
            }))
            .then(
            function imagesResized(){
                return self.imageDelegate.delete(tempImagePath);
            })
            .fail(
            function imageResizeFailed(error)
            {
                self.logger.debug('Image resize failed because %s', error.message);
            });
    }
}
export = BookDelegate