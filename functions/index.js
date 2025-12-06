const {onRequest} = require("firebase-functions/v2/https");
const {log, error} = require("firebase-functions/logger");
const fetch = require("node-fetch");
const {defineString} = require("firebase-functions/params");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {getAuth} = require("firebase-admin/auth");

initializeApp();
const geminiKey = defineString("GEMINI_KEY");


// ■■■ パレットを保存する関数（セキュリティ強化版） ■■■
exports.savePalette = onRequest({cors: true}, async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      res.status(403).json({data: {error: {message: "認証されていません。"}}});
      return;
    }
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const paletteData = req.body.data;
    paletteData.createdAt = new Date();
    paletteData.userId = uid;

    log("保存するパレットデータ:", paletteData);

    const writeResult = await getFirestore().collection("palettes").add(paletteData);
    res.json({data: {id: writeResult.id, message: "パレットを保存しました！"}});
  } catch (err) {
    error("パレットの保存エラー:", err);
    res.status(500).json({data: {error: {message: "保存に失敗しました。"}}});
  }
});


// ■■■ 保存したパレットを取得する関数（セキュリティ強化版） ■■■
exports.getPalettes = onRequest({cors: true}, async (req, res) => {
  try {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      res.status(403).json({data: {error: {message: "認証されていません。"}}});
      return;
    }
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const palettesSnapshot = await getFirestore()
      .collection("palettes")
      .where("userId", "==", uid)
      .orderBy("createdAt", "desc")
      .get();
    
    const palettes = [];
    palettesSnapshot.forEach((doc) => {
      palettes.push({id: doc.id, ...doc.data()});
    });
    res.json({data: palettes});
  } catch (err) {
    error("パレットの取得エラー:", err);
    res.status(500).json({data: {error: {message: "データの取得に失敗しました。"}}});
  }
});


// ■■■ 要約アプリ用関数 (認証不要) ■■■
exports.summarizeText = onRequest({cors: true}, async (req, res) => {
  const modelName = "gemini-2.5-pro";
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${geminiKey.value()}`;
  try {
    const inputText = req.body.data.text;
    log("要約するテキスト:", inputText);
    const requestBody = {
      contents: [{parts: [{text: `以下の文章を日本語で3文程度に要約してください。\n\n${inputText}`}]}],
    };
    const apiResponse = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(requestBody),
    });
    const apiData = await apiResponse.json();
    res.json({data: apiData});
  } catch (err) {
    error("エラーが発生しました:", err);
    res.status(500).json({data: {error: {message: "サーバーでエラーが発生しました。"}}});
  }
});


// ■■■ パレット生成用関数 (認証不要) ■■■
exports.generatePalette = onRequest({cors: true}, async (req, res) => {
  const modelName = "gemini-2.5-pro";
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${geminiKey.value()}`;
  try {
    const themeText = req.body.data.text;
    log("カラーパレットのテーマ:", themeText);
    const prompt = `
      以下のテーマに合う、クリエイティブで美しい配色パレットを提案してください。
      テーマ: "${themeText}"
      【出力形式】
      必ず以下のJSON形式で、他のテキストは一切含めずに回答してください。
      {
        "palette": [
          {"hex": "#XXXXXX", "name": "色の名前1"},
          {"hex": "#XXXXXX", "name": "色の名前2"},
          {"hex": "#XXXXXX", "name": "色の名前3"},
          {"hex": "#XXXXXX", "name": "色の名前4"},
          {"hex": "#XXXXXX", "name": "色の名前5"}
        ],
        "explanation": "この配色パレットのコンセプトと、なぜこれらの色がテーマに合っているのかについての短い解説文。"
      }
    `;
    const requestBody = {contents: [{parts: [{text: prompt}]}]};
    const apiResponse = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(requestBody),
    });
    const apiData = await apiResponse.json();
    res.json({data: apiData});
  } catch (err) {
    error("エラーが発生しました:", err);
    res.status(500).json({data: {error: {message: "サーバーでエラーが発生しました。"}}});
  }
});