// deno-lint-ignore-file
let state = [
    [false, false, false],
    [false, false, false, false],
];
let traded = false;
let allowedUseCookies = false;
let finalAnswer = "";
let right = false;
let fraud = false;

const dealRequest = () => {
    let currentUrl = window.location.href;
    let requestIndex = currentUrl.indexOf("?");
    let request = currentUrl.substring(requestIndex + 1);
    let requestArray = request.split("&");
    let requestObject = [];
    requestArray.forEach((element) => {
        let keyValue = element.split("=");
        requestObject.push(keyValue);
    });
    return requestObject;
};

const dealCookiesRequest = () => {
    if (document.cookie.indexOf("allowedUseCookies=false") !== -1) return false;
    allowedUseCookies = document.cookie.indexOf("allowedUseCookies=true") !== -1;
    if (allowedUseCookies) {
        return true;
    } else {
        allowedUseCookies = confirm("Do you want to use cookies?\nこのサイトではCookieを利用します。\n使用してもよろしいでしょうか。");
        document.cookie = "allowedUseCookies=false; SameSite=Strict";
        return allowedUseCookies;
    }
}

function trade() {
    traded = confirm("Do you want to trade?\n本当に交換しますか？\nスタッフの居ない場所で押した場合、景品は手に入りません。");
    if (traded) {
        document.cookie = "traded=true; SameSite=Strict";
        render();
    }
}

function decode(str) {
    let ans = "";
    for (let i = 0; i < str.length; i += 3) {
        ans += String.fromCharCode(parseInt(str.substring(i, i + 3)));
    }
    return ans;
}

function containsFalse(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            if (!containsFalse(arr[i])) {
                return false;
            }
        } else if (arr[i] === false) {
            return false;
        }
    }
    return true;
}

function render() {
    renderPreparing();
    return;
    setCookieAnswer();
    traded = getCookie("traded");
    right = getCookie("right");
    if (fraud) {
        renderFraud();
        return;
    }
    if (traded) {
        renderTraded();
        return;
    }
    if (!right) {
        if (!containsFalse(state)) renderMain();
        else renderEnd();
        return;
    }
    if (right) {
        finalAnswer = getCookie("finalAnswer");
        if (document.getElementById("inputAnswer") != null) ca();
        else checkedAnswer();
        //renderRight();
        return;
    }
}

const ca = () => {
    checkedAnswer(document.getElementById("inputAnswer").value);
}

function renderMain() {
    setCookieAnswer();
    // 1-1  ~ 1-3、2-1 ~ 2-4をラベルとしたテーブルを生成
    let main = document.getElementById("main");
    let newDiv = document.createElement("div");
    newDiv.classList.add("center-block-on", "rampart-one-regular");
    let newContent = document.createTextNode("文字一覧");
    newDiv.appendChild(newContent);
    main.appendChild(newDiv);

    let table = document.createElement("table");
    table.classList.add("center-block-table", "rampart-one-regular");
    let tr1 = document.createElement("tr");
    let tr2 = document.createElement("tr");
    let th11 = document.createElement("th");
    let th12 = document.createElement("th");
    let th13 = document.createElement("th");
    let th21 = document.createElement("th");
    let th22 = document.createElement("th");
    let th23 = document.createElement("th");
    let th24 = document.createElement("th");
    let td11 = document.createElement("td");
    let td12 = document.createElement("td");
    let td13 = document.createElement("td");
    let td21 = document.createElement("td");
    let td22 = document.createElement("td");
    let td23 = document.createElement("td");
    let td24 = document.createElement("td");
    th11.textContent = "1-1";
    th12.textContent = "1-2";
    th13.textContent = "1-3";
    th21.textContent = "2-1";
    th22.textContent = "2-2";
    th23.textContent = "2-3";
    th24.textContent = "2-4";
    td11.textContent = state[0][0];
    td12.textContent = state[0][1];
    td13.textContent = state[0][2];
    td21.textContent = state[1][0];
    td22.textContent = state[1][1];
    td23.textContent = state[1][2];
    td24.textContent = state[1][3];
    tr1.appendChild(th11);
    tr1.appendChild(th12);
    tr1.appendChild(th13);
    tr1.appendChild(th21);
    tr1.appendChild(th22);
    tr1.appendChild(th23);
    tr1.appendChild(th24);
    tr2.appendChild(td11);
    tr2.appendChild(td12);
    tr2.appendChild(td13);
    tr2.appendChild(td21);
    tr2.appendChild(td22);
    tr2.appendChild(td23);
    tr2.appendChild(td24);
    table.appendChild(tr1);
    table.appendChild(tr2);
    main.appendChild(table);

    let orderDiv = document.createElement("div");
    let orderH4 = document.createElement("h4");
    let orderH4_2 = document.createElement("h4");
    newDiv.classList.add("rampart-one-regular");
    let orderContent = document.createTextNode("他のポスターからQRを読み込んで、");
    let orderContent2 = document.createTextNode("文字を集めてください。");
    orderH4.appendChild(orderContent);
    orderH4_2.appendChild(orderContent2);
    orderDiv.appendChild(orderH4);
    orderDiv.appendChild(orderH4_2);
    main.appendChild(orderDiv);

    if (containsFalse(state)) renderEnd();
}

function renderPreparing() {
    let h3 = document.createElement("h3");
    h3.classList.add("rampart-one-regular");
    let content = document.createTextNode("準備中");
    h3.appendChild(content);
    main.appendChild(h3);
}

function renderServiceEnd() {
    let h3 = document.createElement("h3");
    h3.classList.add("rampart-one-regular");
    let content = document.createTextNode("サービス終了");
    h3.appendChild(content);
    main.appendChild(h3);
}

function renderEnd() {
    if (!containsFalse(state)) return;
    renderInit("main");
    // h3 と 7個のinput と 1個のボタンを配置。
    let newDiv = document.createElement("h3");
    let newContent = document.createTextNode("手に入ったワードを並び替えて、");
    let br = document.createElement("br");
    let newContent2 = document.createTextNode("正解の単語を入力してください。");
    let br2 = document.createElement("br");
    let txt = "";
    for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
            txt += state[i][j];
        }
    }
    let newContent3 = document.createTextNode(txt);
    newDiv.appendChild(newContent);
    newDiv.appendChild(br);
    newDiv.appendChild(newContent2);
    newDiv.appendChild(br2);
    newDiv.appendChild(newContent3);

    let inputs = document.createElement("div");
    inputs.classList.add("center-block-on", "rampart-one-regular");
    let newInput = document.createElement("input");
    newInput.type = "text";
    newInput.maxlength = "7";
    newInput.classList.add("one-word-input");
    newInput.id = "inputAnswer";
    inputs.appendChild(newInput);


    let btn = document.createElement("button");
    let btnContent = document.createTextNode("回答");
    //btn.onclick = `checkedAnswer(document.getElementById("inputAnswer").value)`;
    btn.addEventListener("click", ca);
    btn.classList.add("center-block-button", "rampart-one-regular");
    btn.appendChild(btnContent);
    inputs.appendChild(btn);
    let main = document.getElementById("main");
    main.appendChild(newDiv);
    main.appendChild(inputs);
}

async function renderRight() {

    //console.log(right);
    if (right) {
        renderInit("main");
        // 正解画面と交換するボタンを配置。
        let rightDiv = document.createElement("h3");
        let br = document.createElement("br");
        let rightContent = document.createTextNode("正解!!");
        let content = document.createTextNode("景品交換は10、11月の平日昼休み、ACT412に来てください。");
        rightDiv.appendChild(rightContent);
        rightDiv.appendChild(br);
        rightDiv.appendChild(content);
        let newDiv = document.createElement("button");
        let newContent = document.createTextNode("交換する");
        //newDiv.onclick = "trade()";
        newDiv.appendChild(newContent);
        newDiv.classList.add("center-block-on", "rampart-one-regular");
        newDiv.addEventListener("click", trade);
        let main = document.getElementById("main");
        main.appendChild(rightDiv);
        main.appendChild(newDiv);
    } else {
        fraud = true;
        renderFraud();
    }
}

function renderTraded() {
    if (!traded) return;
    if (containsFalse(state)) {
        fraud = true;
        renderFraud();
    }
    renderInit("main");
    let newDiv = document.createElement("div");
    let newContent = document.createTextNode("交換済み");
    newDiv.appendChild(newContent);
    newDiv.classList.add("center-block", "rampart-one-regular");
    let main = document.getElementById("main");
    main.appendChild(newDiv);
}

function renderFraud() {
    if (!fraud) return;
    renderInit("main");
    let newDiv = document.createElement("div");
    let newContent = document.createTextNode("資格失効");
    newDiv.appendChild(newContent);
    newDiv.classList.add("center-block", "rampart-one-regular");
    let main = document.getElementById("main");
    main.appendChild(newDiv);
}

function renderInit(parentId) {
    let parentElement = document.getElementById(parentId);
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

function getCookie(key) {
    let cookieValue = document.cookie.split("; ") //.find((row) => row.startsWith("test2="))?.split("=")[1];
    for (let i = 0; i < cookieValue.length; i++) {
        cookieValue[i] = cookieValue[i].split("=");
    }
    for (let i = 0; i < cookieValue.length; i++) {
        if (cookieValue[i][0] === key) {
            return cookieValue[i][1];
        }
    }
}

function checkedAnswer(answer = finalAnswer) {
    finalAnswer = answer;
    async function digestMessage(message) {
            let msgUint8 = new TextEncoder().encode(message);
            let hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
            let hashArray = Array.from(new Uint8Array(hashBuffer));
            let hashHex = hashArray
                .map((b) => b.toString(16).padStart(2, "0"))
                .join(""); // convert bytes to hex string
            return hashHex;
        }
        (async () => {
            let digestHex = await digestMessage(answer);
            document.cookie = "finalAnswer=" + finalAnswer + "; SameSite=Strict";
            //console.log(digestHex);
            if (digestHex != "9516331514b51d31a35e85d507d2884b34813386e07ed3fe002f981fe547b4e5") {
                right = false
                return right;
            };
            right = true;
            document.cookie = "right=" + right + "; SameSite=Strict";
            renderRight();
            //console.log(right, fraud, traded, finalAnswer);
        })();
    return right;
}

function setCookieAnswer() {
    let cookieValue = document.cookie.split("; ") //.find((row) => row.startsWith("test2="))?.split("=")[1];
    for (let i = 0; i < cookieValue.length; i++) {
        cookieValue[i] = cookieValue[i].split("=");
    }
    for (let i = 0; i < cookieValue.length; i++) {
        if ((cookieValue[i][0]).indexOf("word") !== -1) {
            let word = cookieValue[i][0].substring(4);
            let index = word.split("-");
            state[index[0] - 1][index[1] - 1] = cookieValue[i][1];
        }
    }
}

function clearCookie() {
    let cookieValue = document.cookie.split("; ") //.find((row) => row.startsWith("test2="))?.split("=")[1];
    for (let i = 0; i < cookieValue.length; i++) {
        cookieValue[i] = cookieValue[i].split("=");
    }
    for (let i = 0; i < cookieValue.length; i++) {
        document.cookie = cookieValue[i][0] + "=; max-age=0"
    }
}

window.onload = () => {
    if (!dealCookiesRequest()) {
        document.querySelector("body").remove();
        return;
    }
    document.cookie = "allowedUseCookies=true; SameSite=Strict";
    let req = dealRequest();
    for (let i = 0; i < req.length; i++) {
        if ((req[i][0]).indexOf("word") !== -1) {
            answer = decodeURI(req[i][1]);
            //console.log(answer);
            let word = req[i][0].substring(4);
            let index = word.split("-");
            state[index[0] - 1][index[1] - 1] = answer;
            document.cookie = `${req[i][0]}=${answer}; SameSite=Strict`;
        }
    }
    render();
}