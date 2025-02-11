const darkModeToggle = document.getElementById('darkModeToggle');
const translateButton = document.getElementById('translate-button');

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function setDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark);
}

function detectSystemDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

darkModeToggle.addEventListener('click', toggleDarkMode);

window.addEventListener('load', () => {
    const systemDarkMode = detectSystemDarkMode();
    const savedDarkMode = localStorage.getItem('darkMode');

    if (systemDarkMode) {
        setDarkMode(true);
    } else if (savedDarkMode !== null) {
        setDarkMode(savedDarkMode === 'true');
    }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    setDarkMode(e.matches);
});

function translateText() {
    const sourceText = document.getElementById('source-text').value;
    const targetLang = document.getElementById('target-language').value;
    const authKey = '095d41bd-ccb3-4bf2-9ad6-554de9949cad:fx';  // 실제 API 키로 교체
    const url = `https://api-free.deepl.com/v2/translate?auth_key=${authKey}&text=${encodeURIComponent(sourceText)}&target_lang=${targetLang}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const translatedText = data.translations[0].text;
            document.getElementById('translated-text').innerText = translatedText;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('translated-text').innerText = '번역 오류가 발생했습니다.';
        });
}

translateButton.addEventListener('click', translateText); // 버튼에 이벤트 리스너 추가
