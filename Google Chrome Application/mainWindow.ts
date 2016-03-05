var editor = <HTMLTextAreaElement>document.getElementById("editor");
var wordList = document.getElementById("wordList");

var lastTop = 0;
wordList.onscroll = (event) => {
    var moveDown = wordList.scrollTop - lastTop > 0 ? true : false;
    if (moveDown) {
        wordList.scrollTop = Math.ceil(wordList.scrollTop / 30) * 26;
    } else {
        wordList.scrollTop = Math.floor(wordList.scrollTop / 30) * 26;
    }
    //lastTop = wordList.scrollTop; 
}


function clearWordList() {
    wordList.innerHTML = "";
}
function addWordList(keyword: string, list: string[]) {
    list.map(x => {
        var el = document.createElement("a");
        el.className = "wordItem";
        el.href = "#";
        el.innerText = x;
        el.onclick = function () {
            editor.value = editor.value.substring(0, editor.value.lastIndexOf(keyword)) + el.innerText;
            editor.focus();
            (<any>editor).onkeyup();
        }
        return el;
    }).forEach(x => {
        wordList.appendChild(x);
    });
}

async function getJSONAsync(url): Promise<JSON> {
    return new Promise<JSON>((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = (event) => {
            if (request.readyState !== 4) return;
            if (request.status >= 200 && request.status < 300) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject(request.statusText);
            }
        };
        request.open('GET', url,true);
        request.send();
    });
}
var list = [];
editor.onkeyup = async (event) => {
    clearWordList();
    var text = editor.value;
    if (!/[\w\u4e00-\u9eff]/.test(text[text.length - 1])) return;//最後一個字必須是可見字元

    var text_ = text.replace(/[^\w\u4e00-\u9eff]/g, "\t");

    var index = text_.lastIndexOf('\t');

    var keyword = text.substring(index + 1);
    if (!keyword || !keyword.length) return;
    console.log('關鍵字:' + keyword);

    for (var i = 0; i < keyword.length; i++) {
        var keyword_ = keyword.substring(i);
        var tempList: any = await getJSONAsync("https://www.google.com.tw/complete/search?client=serp&hl=zh-TW&gs_rn=64&gs_ri=serp&pq=123&cp=1&gs_id=1ij&xhr=t&q=" + keyword_);
        tempList = tempList[1].map(x => x[0]).filter(x => x !== keyword_);
        addWordList(keyword_, tempList);
    }
};