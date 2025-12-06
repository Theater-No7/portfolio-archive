// Firebaseの必要な機能をインポート
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// ご自身のFirebaseプロジェクト設定情報
const firebaseConfig = {
    apiKey: "AIzaSyBV4Z0Z4d9VW_5r_F5593bh-nz-SMdRoRg",
    authDomain: "theater-no7.firebaseapp.com",
    projectId: "theater-no7",
    storageBucket: "theater-no7.appspot.com",
    messagingSenderId: "797320157585",
    appId: "1:797320157585:web:1e227b707fcf538483a230",
    measurementId: "G-CLHBZJKJ2T"
};

// Firebaseアプリを初期化し、Authサービスを取得
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// FunctionのURL
const GENERATE_URL = 'https://us-central1-theater-no7.cloudfunctions.net/generatePalette';
const SAVE_URL = 'https://us-central1-theater-no7.cloudfunctions.net/savePalette';

// HTMLの要素を取得
const themeInput = document.getElementById('theme-input');
const generateButton = document.getElementById('generate-button');
const resultSection = document.getElementById('result-section');
const paletteContainer = document.getElementById('palette-container');
const paletteExplanation = document.getElementById('palette-explanation');
const saveButton = document.getElementById('save-button');
const loginLink = document.getElementById('login-link');
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const logoutButton = document.getElementById('logout-button');

// 最新のパレット情報を記憶しておくための変数
let latestPaletteData = null;

// 認証状態の変化を監視するリスナー
onAuthStateChanged(auth, (user) => {
    if (user) {
        // ユーザーがログインしている場合
        loginLink.classList.add('hidden');
        userInfo.classList.remove('hidden');
        userName.textContent = user.displayName;
    } else {
        // ユーザーがログアウトしている場合
        loginLink.classList.remove('hidden');
        userInfo.classList.add('hidden');
        userName.textContent = '';
    }
});

// ログアウトボタンの処理
logoutButton.addEventListener('click', () => {
    signOut(auth).catch((error) => console.error("ログアウトエラー:", error));
});

// 生成ボタンの処理（変更なし）
generateButton.addEventListener('click', async () => {
    const theme = themeInput.value;
    if (!theme) {
        alert('テーマを入力してください。');
        return;
    }
    generateButton.disabled = true;
    generateButton.innerHTML = '<div class="loader"></div>';
    resultSection.classList.add('hidden');

    try {
        const response = await fetch(GENERATE_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data: {text: theme}}),
        });
        const responseData = await response.json();
        const apiData = responseData.data;

        if (apiData.error) { throw new Error(apiData.error.message); }

        let jsonText = apiData.candidates[0].content.parts[0].text;
        if (jsonText.includes("```")) {
            jsonText = jsonText.substring(jsonText.indexOf('{'), jsonText.lastIndexOf('}') + 1);
        }
        const result = JSON.parse(jsonText);
        latestPaletteData = result;
        displayPalette(result.palette, result.explanation);
    } catch (error) {
        alert(`エラーが発生しました: ${error.message}`);
        console.error('Error:', error);
    } finally {
        generateButton.disabled = false;
        generateButton.innerHTML = 'パレットを生成する';
    }
});

// 保存ボタンの処理（認証情報を送るように改造）
saveButton.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) {
        alert("パレットを保存するにはログインが必要です。");
        window.location.href = '/login.html';
        return;
    }
    if (!latestPaletteData) {
        alert('保存するパレットがありません。先にパレットを生成してください。');
        return;
    }

    saveButton.disabled = true;
    saveButton.textContent = '保存中...';

    try {
        // ★★★ ユーザーの身分証明書（IDトークン）を取得 ★★★
        const idToken = await user.getIdToken();

        // バックエンドにリクエストを送信。ヘッダーに身分証明書を添付
        const response = await fetch(SAVE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify({data: latestPaletteData}),
        });

        const result = await response.json();
        if (result.data.error) {
            throw new Error(result.data.error.message);
        }

        saveButton.textContent = '保存しました！';
        setTimeout(() => {
            saveButton.textContent = 'このパレットを保存する';
        }, 2000);

    } catch (error) {
        alert(`保存に失敗しました: ${error.message}`);
        saveButton.textContent = 'このパレットを保存する';
    } finally {
        saveButton.disabled = false;
    }
});

// パレットと解説を画面に表示する関数（変更なし）
function displayPalette(palette, explanation) {
    paletteContainer.innerHTML = '';
    palette.forEach(color => {
        const colorElement = document.createElement('div');
        colorElement.className = 'color-item';
        
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color.hex;

        const hexCode = document.createElement('p');
        hexCode.className = 'hex-code';
        hexCode.textContent = color.hex;

        colorElement.appendChild(colorBox);
        colorElement.appendChild(hexCode);
        paletteContainer.appendChild(colorElement);
    });
    paletteExplanation.textContent = explanation;
    resultSection.classList.remove('hidden');
}