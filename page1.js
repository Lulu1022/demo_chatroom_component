document.getElementById('sendMessageBtn').addEventListener('click', function() {
    console.log('page1.js')
    const message = "來自頁面 1 的訊息";
    const event = new CustomEvent('newMessage', { detail: message });
    window.dispatchEvent(event);
    console.log(message);
});
