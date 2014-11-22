///<reference path='../_references.d.ts'/>
import url                                      = require('url');
import Coral                                    = require('Coral');

class Urls
{
    static submit(baseUrl?:string):string               { return Urls.get('/submit',{}, baseUrl); }
    static home(baseUrl?:string):string                 { return Urls.get('/',{}, baseUrl); }
    static confirmation(baseUrl?:string):string         { return Urls.get('/confirmation',{}, baseUrl); }
    static uploadFile(baseUrl?:string):string           { return Urls.get('/upload',{}, baseUrl); }
    static book(bookId?:number, baseUrl?:string)        { return Urls.get('/book/:bookId',{bookId:bookId},baseUrl)}
    static author(authorId?:number, baseUrl?:string)    { return Urls.get('/author/:authorId',{authorId:authorId},baseUrl)}
    
    static dashboard(baseUrl?:string)                   { return Urls.get('/dashboard',{},baseUrl)}

    static get(urlPattern:string, values?:Object, baseUrl?:string):string
    {
        if (values)
            for (var key in values)
                if (values[key] != null)
                {
                    var urlParamRegex:RegExp = new RegExp(':' + key);
                    var urlParamTypeRegex:RegExp = new RegExp('\\(([^\\(]*)\\)', 'i');
                    urlPattern = urlPattern
                        .replace(urlParamTypeRegex, '')
                        .replace(urlParamRegex, values[key]);
                }
        if (!Coral.Utils.isNullOrEmpty(baseUrl))
            urlPattern = url.resolve(baseUrl, urlPattern);

        return urlPattern;
    }
}
export = Urls