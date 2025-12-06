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

// 保存したパレットを取得するためのFunctionのURL
const GET_PALETTES_URL = 'https://us-central1-theater-no7.cloudfunctions.net/getPalettes';

// HTMLの要素を取得
const galleryContainer = document.getElementById('gallery-container');
const loginLink = document.getElementById('login-link');
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const logoutButton = document.getElementById('logout-button');

// 認証状態の変化を監視し、ページの表示を制御する
onAuthStateChanged(auth, (user) => {
    if (user) {
        // ログインしている場合: ヘッダーを更新し、ギャラリーを読み込む
        loginLink.classList.add('hidden');
        userInfo.classList.remove('hidden');
        userName.textContent = user.displayName;
        fetchAndDisplayPalettes(user); // ユーザー情報を渡して、その人のパレットを取得
    } else {
        // ログアウトしている場合: ヘッダーを更新し、ログインを促すメッセージを表示
        loginLink.classList.remove('hidden');
        userInfo.classList.add('hidden');
        userName.textContent = '';
        galleryContainer.innerHTML = `<p>ギャラリーを見るには、<a href="/login.html">ログイン</a>してください。</p>`;
    }
});

// ログアウトボタンの処理
logoutButton.addEventListener('click', () => {
    signOut(auth).catch((error) => console.error("ログアウトエラー:", error));
});

// 【修正点】パレットを取得して表示する関数の中身を実装
async function fetchAndDisplayPalettes(user) {
    galleryContainer.innerHTML = `<p class="loading-text">ギャラリーを読み込んでいます...</p>`;
    try {
        // ★★★ ユーザーの身分証明書（IDトークン）を取得 ★★★
        const idToken = await user.getIdToken();

        // バックエンドにリクエストを送信。この時、ヘッダーに身分証明書を添付する
        const response = await fetch(GET_PALETTES_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        });
        
        const responseData = await response.json();
        
        if (responseData.data.error) {
            throw new Error(responseData.data.error.message);
        }
        
        const palettes = responseData.data;
        displayPalettes(palettes);

    } catch (error) {
        galleryContainer.innerHTML = `<p style="color: red;">エラー: データの読み込みに失敗しました。</p>`;
        console.error("Error fetching palettes:", error);
    }
}

// 取得した全パレットを画面に表示する関数（変更なし）
function displayPalettes(palettes) {
    galleryContainer.innerHTML = '';

    if (palettes.length === 0) {
        galleryContainer.innerHTML = `<p>まだ保存されたパレットはありません。</p>`;
        return;
    }

    palettes.forEach(paletteData => {
        const card = document.createElement('div');
        card.className = 'palette-card';

        const preview = document.createElement('div');
        preview.className = 'palette-preview';
        paletteData.palette.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.style.backgroundColor = color.hex;
            preview.appendChild(colorDiv);
        });

        const explanation = document.createElement('p');
        explanation.className = 'explanation';
        explanation.textContent = paletteData.explanation;

        const timestamp = document.createElement('p');
        timestamp.className = 'timestamp';
        const date = new Date(paletteData.createdAt._seconds * 1000);
        timestamp.textContent = date.toLocaleString('ja-JP');

        card.appendChild(preview);
        card.appendChild(explanation);
        card.appendChild(timestamp);

        galleryContainer.appendChild(card);
    });
}