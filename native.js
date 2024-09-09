// 原生 JavaScript 處理按鈕點擊事件
document.getElementById('btnPage1').addEventListener('click', function() {
    loadPage('page1');
});

document.getElementById('btnPage2').addEventListener('click', function() {
    loadPage('page2');
});

function loadPage(page) {
    const pages = {
        page1: {
            title: '歡迎！這裡是頁面 1',
            content: '這是頁面 1 的內容...'
        },
        page2: {
            title: '歡迎！這裡是頁面 2',
            content: '這是頁面 2 的內容...'
        }
    };

    document.getElementById('pageTitle').innerText = pages[page].title;
    document.getElementById('pageContent').innerText = pages[page].content;
}

// 預設載入頁面 1
window.onload = function() {
    loadPage('page1');
};
