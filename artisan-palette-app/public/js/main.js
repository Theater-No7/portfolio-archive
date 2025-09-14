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

// 最新のパレット情報を記憶しておくための変数
let latestPaletteData = null;

// 生成ボタンがクリックされた時の処理
generateButton.addEventListener('click', async () => {
    const theme = themeInput.value;
    if (!theme) {
        alert('テーマを入力してください。');
        return;
    }

    // ローディング表示
    generateButton.disabled = true;
    generateButton.textContent = '生成中...';
    resultSection.classList.add('hidden');

    try {
        const response = await fetch(GENERATE_URL, {
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

        // 生成されたパレットを記憶させる
        latestPaletteData = result;

        displayPalette(result.palette, result.explanation);

    } catch (error) {
        alert(`エラーが発生しました: ${error.message}`);
        console.error('Error:', error);
    } finally {
        generateButton.disabled = false;
        generateButton.textContent = 'パレットを生成する';
    }
});

// 保存ボタンがクリックされた時の処理
saveButton.addEventListener('click', async () => {
    if (!latestPaletteData) {
        alert('保存するパレットがありません。先にパレットを生成してください。');
        return;
    }

    saveButton.disabled = true;
    saveButton.textContent = '保存中...';

    try {
        const response = await fetch(SAVE_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data: latestPaletteData}), // 記憶したデータを送信
        });

        const result = await response.json();
        if (result.data.error) {
            throw new Error(result.data.error.message);
        }

        saveButton.textContent = '保存しました！';
        // 2秒後にボタンのテキストを元に戻す
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

// パレットと解説を画面に表示する関数
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