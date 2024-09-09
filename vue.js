const ChatBox = {
    props: ['initialMessages', 'chatboxTitle'],
    template: `
        <div class="chatbox">
            <div class="chatbox-header">{{ chatboxTitle }}（渲染次數: {{ renderCount }}）</div>
            <div class="chatbox-messages" ref="messages">
                <p v-for="message in messages">{{ message }}</p>
            </div>
            <input type="text" class="chatbox-input" v-model="newMessage" @keypress.enter="addMessage" placeholder="輸入訊息...">
        </div>
    `,
    data() {
        return {
            messages: Array.isArray(this.initialMessages) ? [...this.initialMessages] : [], // 確保是陣列
            newMessage: '',
            renderCount: 0
        };
    },
    created() {
        this.renderCount += 1; // 每次組件創建時，渲染次數 +1
        
        window.addEventListener('newMessage', this.receiveMessage); // 監聽 'newMessage' 事件
    },
    beforeUnmount() {
        // 組件銷毀時移除監聽
        window.removeEventListener('newMessage', this.receiveMessage);
    },
    methods: {
        addMessage() {
            if (this.newMessage.trim()) {
                this.messages.push(this.newMessage);
                this.newMessage = '';
                this.scrollToBottom();
            }
        },
        receiveMessage(event) {
            // 接收到的自定義事件中的訊息
            const newMessage = event.detail;
            this.messages.push(newMessage);
            this.scrollToBottom();
        },
        scrollToBottom() {
            this.$nextTick(() => {
                this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
            });
        }
    }
};


// Vue app 實例
const app = Vue.createApp({
    components: {
        'chat-box': ChatBox
    }
});

app.mount('#app');
