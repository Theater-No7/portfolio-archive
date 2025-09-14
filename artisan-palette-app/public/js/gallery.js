// 保存したパレットを取得するためのFunctionのURL
const GET_PALETTES_URL = 'https://us-central1-theater-no7.cloudfunctions.net/getPalettes';

// HTMLの要素を取得
const galleryContainer = document.getElementById('gallery-container');

// ページの読み込みが完了したら、自動的にデータを取得する
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(GET_PALETTES_URL);
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
});

// 取得した全パレットを画面に表示する関数
function displayPalettes(palettes) {
    // 「読み込み中...」のメッセージを消す
    galleryContainer.innerHTML = '';

    if (palettes.length === 0) {
        galleryContainer.innerHTML = `<p>まだ保存されたパレットはありません。</p>`;
        return;
    }

    // 取得したデータの一つ一つに対して、カードを作成する
    palettes.forEach(paletteData => {
        // カード全体を包むdiv
        const card = document.createElement('div');
        card.className = 'palette-card';

        // 5色のプレビューを表示するdiv
        const preview = document.createElement('div');
        preview.className = 'palette-preview';
        paletteData.palette.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.style.backgroundColor = color.hex;
            preview.appendChild(colorDiv);
        });

        // 解説文を表示するp
        const explanation = document.createElement('p');
        explanation.className = 'explanation';
        explanation.textContent = paletteData.explanation;

        // 保存日時を表示するp
        const timestamp = document.createElement('p');
        timestamp.className = 'timestamp';
        // Firestoreの日時データを、人間が読める形式に変換
        const date = new Date(paletteData.createdAt._seconds * 1000);
        timestamp.textContent = date.toLocaleString('ja-JP');

        // 作成した部品をカードに合体させる
        card.appendChild(preview);
        card.appendChild(explanation);
        card.appendChild(timestamp);

        // 完成したカードをギャラリーに追加する
        galleryContainer.appendChild(card);
    });
}