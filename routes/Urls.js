///<reference path='../_references.d.ts'/>
var url = require('url');
var Coral = require('Coral');

var Urls = (function () {
    function Urls() {
    }
    Urls.login = function (baseUrl) {
        return Urls.get('/login', {}, baseUrl);
    };
    Urls.register = function (baseUrl) {
        return Urls.get('/register', {}, baseUrl);
    };
    Urls.submit = function (baseUrl) {
        return Urls.get('/submit', {}, baseUrl);
    };
    Urls.home = function (baseUrl) {
        return Urls.get('/', {}, baseUrl);
    };
    Urls.confirmation = function (baseUrl) {
        return Urls.get('/confirmation', {}, baseUrl);
    };
    Urls.uploadFile = function (baseUrl) {
        return Urls.get('/upload', {}, baseUrl);
    };
    Urls.book = function (bookId, baseUrl) {
        return Urls.get('/book/:bookId', { bookId: bookId }, baseUrl);
    };
    Urls.author = function (authorId, baseUrl) {
        return Urls.get('/author/:authorId', { authorId: authorId }, baseUrl);
    };

    Urls.dashboard = function (baseUrl) {
        return Urls.get('/dashboard', {}, baseUrl);
    };

    Urls.get = function (urlPattern, values, baseUrl) {
        if (values)
            for (var key in values)
                if (values[key] != null) {
                    var urlParamRegex = new RegExp(':' + key);
                    var urlParamTypeRegex = new RegExp('\\(([^\\(]*)\\)', 'i');
                    urlPattern = urlPattern.replace(urlParamTypeRegex, '').replace(urlParamRegex, values[key]);
                }
        if (!Coral.Utils.isNullOrEmpty(baseUrl))
            urlPattern = url.resolve(baseUrl, urlPattern);

        return urlPattern;
    };
    return Urls;
})();
module.exports = Urls;
//# sourceMappingURL=Urls.js.map
