// 定義聊天室組件
const ChatBox = {
    template: `
        <div class="chatbox">
            <div class="chatbox-header">聊天室（渲染次數: {{ renderCount }}）</div>
            <div class="chatbox-messages" ref="messages">
                <p v-for="message in messages">{{ message }}</p>
            </div>
            <input type="text" class="chatbox-input" v-model="newMessage" @keypress.enter="addMessage" placeholder="輸入訊息...">
        </div>
    `,
    data() {
        return {
            messages: [],
            newMessage: '',
            renderCount: 0
        };
    },
    created() {
        this.renderCount += 1; // 每次組件創建時，渲染次數 +1
    },
    methods: {
        addMessage() {
            if (this.newMessage.trim()) {
                this.messages.push(this.newMessage);
                this.newMessage = '';
                this.$nextTick(() => {
                    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
                });
            }
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
