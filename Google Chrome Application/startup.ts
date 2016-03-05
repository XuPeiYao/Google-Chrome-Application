var appConfig = {
    singleWindow: true,//是否為單一視窗應用程式
    startupWindow: "mainWindow.html",//應用程式啟動目標
    createWindowOptions: {//應用程式視窗初始化選項
        outerBounds: {
            width: 800,
            height: 500,
            minHeight: 46
        },
        frame: "none"//表示是否有視窗框線(包含關閉等系統控制項)，none=無,chrome|undefined=有
    } as chrome.app.window.CreateWindowOptions
};

chrome.app.runtime.onLaunched.addListener(async () => {
    console.info("觸發應用程式啟動事件");
    var activityWindow = chrome.app.window.getAll();
    if (appConfig.singleWindow && chrome.app.window.getAll().length >= 1) {//應用程式設定為單一視窗且目前作用實體有一個以上
        console.warn("應用程式目前設定為單一視窗");
        activityWindow[0].focus();//將原本的視窗開啟
        return;
    }

    //異步初始化視窗
    var createdWindow = await chrome.app.window.createAsync(appConfig.startupWindow, appConfig.createWindowOptions);

    //加入應用程式關閉事件
    createdWindow.onClosed.addListener(() => {
        console.info("觸發應用程式結束事件");
    });
});