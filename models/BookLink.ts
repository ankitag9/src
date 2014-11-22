///<reference path='../_references.d.ts'/>
import Coral                                                = require('Coral');
import BookLinkType                                         = require('../enums/BookLinkType');

class BookLink extends Coral.BaseModel
{
    static TABLE_NAME:string                    = 'book_link';

    static COL_BOOK_ID:string = 'book_id';
    static COL_LINK:string = 'link';
    static COL_TYPE:string = 'type';

    private book_id:number;
    private link:string;
    private type:BookLinkType;

    static PUBLIC_FIELDS:string[] = [BookLink.COL_BOOK_ID, BookLink.COL_LINK, BookLink.COL_TYPE];

    getBookId():number                          { return this.book_id; }
    getLink():string                            { return this.link; }
    getType():BookLinkType                      { return this.type; }

    setBookId(val:number)                       { this.book_id = val; }
    setLink(val:string)                         { this.link = val; }
    setType(val:BookLinkType)                   { this.type = val; }
}
export = BookLink