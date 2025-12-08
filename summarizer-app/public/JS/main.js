// ★★★ 新しいFunction URLに更新 ★★★
const API_URL = 'https://us-central1-theater-no7.cloudfunctions.net/summarizeText';

// HTMLの要素を取得
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

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data: {text: inputText}}),
        });

        const responseData = await response.json();
        const apiData = responseData.data;

        if (apiData.error) {
            throw new Error(apiData.error.message);
        }
        
        const summary = apiData.candidates[0].content.parts[0].text;
        resultOutput.textContent = summary;

    } catch (error) {
        resultOutput.textContent = 'エラーが発生しました。時間をおいて再度お試しください。';
        console.error('Error:', error);
    } finally {
        submitButton.disabled = false;
    }
});