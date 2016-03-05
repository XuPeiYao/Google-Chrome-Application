module chrome.app.window {
    export async function createAsync(url: string, options?: CreateWindowOptions): Promise<chrome.app.window.AppWindow> {
        return new Promise<chrome.app.window.AppWindow>((resolve, reject) => {
            try {
                chrome.app.window.create(url, options, (created_window) => {
                    resolve(created_window);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}