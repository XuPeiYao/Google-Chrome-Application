var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var appConfig = {
    singleWindow: true,
    startupWindow: "mainWindow.html",
    createWindowOptions: {
        outerBounds: {
            width: 800,
            height: 500,
            minHeight: 46
        },
        frame: "none" //表示是否有視窗框線(包含關閉等系統控制項)，none=無,chrome|undefined=有
    }
};
chrome.app.runtime.onLaunched.addListener(() => __awaiter(this, void 0, void 0, function* () {
    console.info("觸發應用程式啟動事件");
    var activityWindow = chrome.app.window.getAll();
    if (appConfig.singleWindow && chrome.app.window.getAll().length >= 1) {
        console.warn("應用程式目前設定為單一視窗");
        activityWindow[0].focus(); //將原本的視窗開啟
        return;
    }
    //異步初始化視窗
    var createdWindow = yield chrome.app.window.createAsync(appConfig.startupWindow, appConfig.createWindowOptions);
    //加入應用程式關閉事件
    createdWindow.onClosed.addListener(() => {
        console.info("觸發應用程式結束事件");
    });
}));
//# sourceMappingURL=startup.js.map