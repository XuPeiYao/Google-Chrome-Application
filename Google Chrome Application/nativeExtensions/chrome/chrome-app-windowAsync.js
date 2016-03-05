var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var chrome;
(function (chrome) {
    var app;
    (function (app) {
        var window;
        (function (window) {
            function createAsync(url, options) {
                return __awaiter(this, void 0, Promise, function* () {
                    return new Promise((resolve, reject) => {
                        try {
                            chrome.app.window.create(url, options, (created_window) => {
                                resolve(created_window);
                            });
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                });
            }
            window.createAsync = createAsync;
        })(window = app.window || (app.window = {}));
    })(app = chrome.app || (chrome.app = {}));
})(chrome || (chrome = {}));
//# sourceMappingURL=chrome-app-windowAsync.js.map