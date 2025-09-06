// 必要なライブラリをインポートします
const {onRequest} = require("firebase-functions/v2/https");
const {log, error} = require("firebase-functions/logger");
const fetch = require("node-fetch");

/**
 * ブラウザからのリクエストを受け取り、代理でGemini APIを呼び出す関数
 */
exports.summarizeText = onRequest({cors: true}, async (req, res) => {
  // .env.localからAPIキーを読み込みます
  const geminiKey = process.env.GEMINI_KEY;

  // APIキーが設定されていない場合はエラーを返します
  if (!geminiKey) {
    error("GEMINI_KEYが.env.localに設定されていません。");
    res.status(500).json({data: {error: {message: "サーバー設定エラーです。"}}});
    return;
  }

  // Google AI Studioで確認した、利用可能な最新モデル名を使います
  const modelName = "gemini-1.5-pro-latest";
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${geminiKey}`;

  try {
    const inputText = req.body.data.text;
    log("要約するテキスト:", inputText);

    const requestBody = {
      contents: [{
        parts: [{
          text: `以下の文章を日本語で3文程度に要約してください。\n\n${inputText}`,
        }],
      }],
    };

    const apiResponse = await fetch(API_URL, {
      method: "POST",
      // ESLintのルールに従い、{}の内側にスペースを入れません
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
