<template>
  <div class="chat">
    <div class="chat-navbar">{{ $route.params.id }} {{ user.name }}</div>
    <div class="chat-content">
      <div class="fix"></div>
      <div
        class="chat-message"
        :class="{ 'is-author': m.authorId === 1 }"
        v-for="m of messages"
        :key="m.id"
      >
        {{ m.content }}
      </div>
    </div>
    <div class="chat-footer">
      <input
        class="input is-link"
        type="text"
        placeholder="Type something..."
        v-model="message"
        @keypress.enter="sendMessage"
      />
      <button class="button ml-2">
        <span class="icon is-small">
          <i class="fas fa-upload"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { socket } from './index.vue'
import { store } from './store'

export default defineComponent({
  data() {
    return {
      message: '',
      messages: [],
      user: {},
    }
  },
  mounted() {
    socket.emit('get_user', this.$route.params.id)
    socket.on('receive_user', (data) => {
      this.user = data
    })
    socket.on('receive_message', (data) => {
      this.messages.push(data)
    })
    socket.on(`receive_message-${this.$route.params.id}`, (data) => {
      this.messages.push(data)
    })
  },
  methods: {
    sendMessage() {
      if (!this.message.trim()) {
        return
      }
      socket.emit('send_message', {
        content: this.message,
        authorId: +this.$route.params.id,
      })
      this.message = ''
    },
  },
  computed: {
    profile() {
      return store.getState().currentUser
    },
  },
})
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
}
.chat-navbar {
  border-bottom: 1px solid #e5e5e5;
  padding: 10px 20px;
  height: 50px;
}
.chat-content {
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
  height: calc(100vh - 110px);
}
.chat-content > :first-child {
  margin-top: auto !important;
  /* use !important to prevent breakage from child margin settings */
}
.chat-message {
  max-width: 50%;
  padding: 5px 10px;
  border-radius: 20px;
  background: rgb(146, 162, 179);
  margin-bottom: 10px;
  align-self: start;
  color: white;
}
.chat-message.is-author {
  background: #4f7d96;
  align-self: end;
}
.chat-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 301px;
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 10px 20px;
  height: 60px;
}
</style>
