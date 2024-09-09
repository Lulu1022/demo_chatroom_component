document.addEventListener("DOMContentLoaded", () => {
    const btnPage1 = document.getElementById('btnPage1');
    const btnPage2 = document.getElementById('btnPage2');
    const contentDiv = document.getElementById('content');

    // 動態加載頁面
    function loadPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                contentDiv.innerHTML = html;
    
                // 查找 HTML 中的 <script src=""> 並動態加載該外部 JS 檔案
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html; // 解析載入的 HTML
                const scripts = tempDiv.querySelectorAll('script');
    
                scripts.forEach(script => {
                    if (script.src) {
                        // 如果是外部 JS 檔案，動態加載
                        const newScript = document.createElement('script');
                        newScript.src = script.src;
                        document.body.appendChild(newScript); // 動態添加到 body 中
                    }
                });
            })
            .catch(error => console.error('無法加載頁面:', error));
    }
    
    // // 動態加載頁面內容的函數
    // function loadPage(url) {
    //     fetch(url)
    //         .then(response => response.text())
    //         .then(html => {
    //             contentDiv.innerHTML = html;
    //         })
    //         .catch(error => console.error('無法加載頁面:', error));
    // }

    // 點擊按鈕切換頁面並更新 URL
    btnPage1.addEventListener('click', () => {
        history.pushState(null, '', '?page=page1');
        loadPage('page1.html');
    });

    btnPage2.addEventListener('click', () => {
        history.pushState(null, '', '?page=page2');
        loadPage('page2.html');
    });

    // 根據當前 URL 加載對應的頁面
    function loadPageFromUrl() {
        const url = new URL(window.location.href);
        const page = url.searchParams.get("page") || "page1";
        if (page === 'page2') {
            loadPage('page2.html');
        } else {
            loadPage('page1.html');
        }
    }

    // 確保瀏覽器前進/後退功能正常
    window.addEventListener('popstate', () => {
        loadPageFromUrl();
    });

    // 初始化頁面加載
    loadPageFromUrl();
});

// document.getElementById('btnPage1').addEventListener('click', function() {
//     loadPage('page1');
// });

// document.getElementById('btnPage2').addEventListener('click', function() {
//     loadPage('page2');
// });

// function loadPage(page) {
//     const pages = {
//         page1: {
//             title: '歡迎！這裡是頁面 1',
//             content: '這是頁面 1 的內容...'
//         },
//         page2: {
//             title: '歡迎！這裡是頁面 2',
//             content: '這是頁面 2 的內容...'
//         }
//     };

//     document.getElementById('pageTitle').innerText = pages[page].title;
//     document.getElementById('pageContent').innerText = pages[page].content;
// }

// // 預設載入頁面 1
// window.onload = function() {
//     loadPage('page1');
// };+=
