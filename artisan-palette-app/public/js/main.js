// ★★★ ご自身の「generatePalette」のURLをここに貼り付けてください！ ★★★
const API_URL = 'https://us-central1-nanaban-gekijou.cloudfunctions.net/generatePalette';

// HTMLの要素を取得
const themeInput = document.getElementById('theme-input');
const generateButton = document.getElementById('generate-button');
const resultSection = document.getElementById('result-section');
const paletteContainer = document.getElementById('palette-container');
const paletteExplanation = document.getElementById('palette-explanation');

// ボタンがクリックされた時の処理
generateButton.addEventListener('click', async () => {
    const theme = themeInput.value;
    if (!theme) {
        alert('テーマを入力してください。');
        return;
    }
    generateButton.disabled = true;
    generateButton.textContent = '生成中...';
    resultSection.classList.add('hidden');

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data: {text: theme}}),
        });

        const responseData = await response.json();
        const apiData = responseData.data;

        if (apiData.error) {
            throw new Error(apiData.error.message);
        }

        let jsonText = apiData.candidates[0].content.parts[0].text;
        
        if (jsonText.includes("```")) {
            jsonText = jsonText.substring(jsonText.indexOf('{'), jsonText.lastIndexOf('}') + 1);
        }

        const result = JSON.parse(jsonText);

        displayPalette(result.palette, result.explanation);

    } catch (error) {
        alert(`エラーが発生しました: ${error.message}`);
        console.error('Error:', error);
    } finally {
        generateButton.disabled = false;
        generateButton.textContent = 'パレットを生成する';
    }
});

// パレットと解説を画面に表示する関数
function displayPalette(palette, explanation) {
    paletteContainer.innerHTML = '';

    // ★★★【最終修正】★★★
    // ここからが修正部分です
    palette.forEach(color => {
        // 1. 全体を包むdiv要素を作成
        const colorElement = document.createElement('div');
        colorElement.className = 'color-item'; // CSSでデザインするためのクラス名

        // 2. 色を表示するボックスを作成
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color.hex;

        // 3. HEXコードを表示するp要素を作成
        const hexCode = document.createElement('p');
        hexCode.className = 'hex-code';
        hexCode.textContent = color.hex;

        // 4. 全体を包む要素に、カラーボックスとHEXコードを追加
        colorElement.appendChild(colorBox);
        colorElement.appendChild(hexCode);

        // 5. 最後に、完成した部品をコンテナに追加
        paletteContainer.appendChild(colorElement);
    });
    // ★★★ 修正はここまで ★★★

    paletteExplanation.textContent = explanation;
    resultSection.classList.remove('hidden');
}