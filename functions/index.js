const {onRequest} = require("firebase-functions/v2/https");
const {log, error} = require("firebase-functions/logger");
const fetch = require("node-fetch");
const {defineString} = require("firebase-functions/params");

// ★★★【追記1】★★★
// Firestoreを操作するための機能をインポート
const {getFirestore} = require("firebase-admin/firestore");
const {initializeApp} = require("firebase-admin/app");

// Firebase Admin SDKの初期化（ファイル内で一度だけ行います）
initializeApp();

const geminiKey = defineString("GEMINI_KEY");

// 要約アプリ用関数 
exports.summarizeText = onRequest({cors: true}, async (req, res) => {
  const modelName = "gemini-2.5-pro";
  // ★★★【修正点3】★★★
  // パラメータの値を使うには .value() を付けます
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

// パレット生成アプリ用関数

exports.generatePalette = onRequest({cors: true}, async (req, res) => {
  const modelName = "gemini-2.5-pro";
  // ★★★【修正点4】★★★
  // こちらも同様に .value() を付けてパラメータの値を使います
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

// ★★★【追記2】パレットを保存するための新しい関数 ★★★
exports.savePalette = onRequest({cors: true}, async (req, res) => {
  try {
    const paletteData = req.body.data;
    // データに保存日時を追加
    paletteData.createdAt = new Date();

    log("保存するパレットデータ:", paletteData);

    // Firestoreの'palettes'という場所に新しいデータを追加
    const writeResult = await getFirestore()
      .collection("palettes")
      .add(paletteData);

    // 成功したら、保存したデータのIDを返す
    res.json({data: {id: writeResult.id, message: "パレットを保存しました！"}});

  } catch (err) {
    error("パレットの保存エラー:", err);
    res.status(500).json({data: {error: {message: "保存に失敗しました。"}}});
  }
});

// ★★★【追記3】保存したパレットを全て取得する新しい関数 ★★★
exports.getPalettes = onRequest({cors: true}, async (req, res) => {
  try {
    const palettesSnapshot = await getFirestore()
      .collection("palettes")
      .orderBy("createdAt", "desc") // 新しいものが上に来るように並べ替え
      .get();

    const palettes = [];
    palettesSnapshot.forEach((doc) => {
      palettes.push({id: doc.id, ...doc.data()});
    });

    // 取得した全パレットのリストを返す
    res.json({data: palettes});

  } catch (err) {
    error("パレットの取得エラー:", err);
    res.status(500).json({data: {error: {message: "データの取得に失敗しました。"}}});
  }
});