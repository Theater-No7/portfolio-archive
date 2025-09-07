// APIキーの指定
const API_KEY = 'AIzaSyDHrJ5Fpujt8fl9HO_cAwbAk-4gvnNSoHE';
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${API_KEY}`;

// HTMLの要素をJavaScriptで操作するために取得します
const submitButton = document.getElementById('submit-button');
const textInput = document.getElementById('text-input');
const resultOutput = document.getElementById('result-output');

// 「要約する」ボタンがクリックされた時の処理を定義します
submitButton.addEventListener('click', async () => {
    const inputText = textInput.value;
    if (!inputText) {
        alert('要約したい文章を入力してください。');
        return;
    }
    resultOutput.textContent = 'AIが要約を生成中です...しばらくお待ちください...';
    submitButton.disabled = true;

    const requestBody = {
        contents: [{
            parts: [{
                text: `以下の文章を日本語で3文程度に要約してください。\n\n${inputText}`
            }]
        }]
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        
        if (data.error) {
            console.error('API Error:', data.error);
            resultOutput.textContent = `APIエラーが発生しました: ${data.error.message}`;
        } else {
            const summary = data.candidates[0].content.parts[0].text;
            resultOutput.textContent = summary;
        }

    } catch (error) {
        resultOutput.textContent = 'エラーが発生しました。時間をおいて再度お試しください。';
        console.error('Fetch Error:', error);
    } finally {
        submitButton.disabled = false;
    }
});