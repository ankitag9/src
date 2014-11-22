///<reference path='../_references.d.ts'/>
import Coral                                                = require('Coral');
import BookGenre                                            = require('../enums/BookGenre');

class Book extends Coral.BaseModel
{
    static TABLE_NAME:string                    = 'book';

    static COL_TITLE:string = 'title';
    static COL_USER_ID:string = 'user_id';
    static COL_SUMMARY:string = 'summary';
    static COL_GENRE:string = 'genre';

    private title:string;
    private user_id:number;
    private summary:string;
    private genre:BookGenre;

    static PUBLIC_FIELDS:string[] = [Book.COL_GENRE, Book.COL_SUMMARY, Book.COL_TITLE, Book.COL_USER_ID, Book.COL_ID, Book.COL_UPDATED, Book.COL_CREATED];

    getTitle():string                       { return this.title; }
    getUserId():number                      { return this.user_id; }
    getSummary():string                     { return this.summary; }
    getGenre():BookGenre                    { return this.genre; }

    setTitle(val:string)                    { this.title = val; }
    setUserId(val:number)                   { this.user_id = val; }
    setSummary(val:string)                  { this.summary = val; }
    setGenre(val:BookGenre)                 { this.genre = val; }
}
export = Book