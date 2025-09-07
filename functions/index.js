const {onRequest} = require("firebase-functions/v2/https");
const {log, error} = require("firebase-functions/logger");
const fetch = require("node-fetch");
// ★★★【修正点1】★★★
// パラメータを定義するための機能をインポートします
const {defineString} = require("firebase-functions/params");

// ★★★【修正点2】★★★
// この関数が必要とする秘密のパラメータ(APIキー)をここで定義します
const geminiKey = defineString("GEMINI_KEY");


// ■■■ 昨日の要約アプリ用関数 (こちらも修正済み) ■■■
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


// ■■■ 今日のカラーパレットアプリ用関数 (こちらも修正済み) ■■■
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