// Firebaseの必要な機能（関数）を、SDKから直接インポートします
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// ご主人様が取得した、ご自身のFirebaseプロジェクト設定情報
const firebaseConfig = {
    apiKey: "AIzaSyBV4Z0Z4d9VW_5r_F5593bh-nz-SMdRoRg",
    authDomain: "theater-no7.firebaseapp.com",
    projectId: "theater-no7",
    storageBucket: "theater-no7.appspot.com",
    messagingSenderId: "797320157585",
    appId: "1:797320157585:web:1e227b707fcf538483a230",
    measurementId: "G-CLHBZJKJ2T"
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);
// Firebase Authenticationのサービスを取得
const auth = getAuth(app);
// Googleログインのためのプロバイダーを設定
const provider = new GoogleAuthProvider();


// HTMLからGoogleログインボタンの要素を取得
const googleLoginButton = document.getElementById('google-login-button');

// ボタンがクリックされたら、Googleのログイン処理を開始
googleLoginButton.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // ログイン成功！
            const user = result.user;
            console.log("ログイン成功:", user);
            alert(`ようこそ、${user.displayName}さん！`);

            // ログインが成功したら、アプリのトップページに移動させる
            window.location.href = '/index.html'; 
            
        }).catch((error) => {
            // ログイン失敗...
            console.error("ログインエラー:", error);
            alert(`ログインに失敗しました。エラーコード: ${error.code}`);
        });
});