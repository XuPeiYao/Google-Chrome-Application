var appWindow = chrome.app.window.current();
document.getElementById("close").addEventListener('click', () => {
    appWindow.close();
});
document.getElementById("minimize").addEventListener('click', () => {
    appWindow.minimize();
});
document.getElementById("maximize").addEventListener('click', () => {
    appWindow.maximize();
});
document.getElementById("restore").addEventListener('click', () => {
    appWindow.restore();
});

appWindow.onMaximized.addListener(() => {
    document.getElementById("maximize").setAttribute("hidden", "");
    document.getElementById("restore").removeAttribute("hidden");
});
appWindow.onRestored.addListener(() => {
    document.getElementById("restore").setAttribute("hidden", "");
    document.getElementById("maximize").removeAttribute("hidden");
});

window.addEventListener("focus", () => {
    document.querySelector("body > header").setAttribute("focus", "");
});
window.addEventListener("blur", () => {
    document.querySelector("body > header").removeAttribute("focus");
});