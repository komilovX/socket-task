<template>
  <div class="chat-container">
    <div class="sidebar">
      <div
        class="sidebar-user"
        v-for="user of users"
        :key="user.id"
        @click="pushToChat(user.id)"
      >
        {{ user.name }}
      </div>
    </div>
    <div class="chat">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { io } from 'socket.io-client'

const options = {
  autoConnect: true,
  transports: ['websocket'],
}
export const socket = io('http://localhost:4000', options)

export default defineComponent({
  data() {
    return {
      users: [],
      user: {},
    }
  },
  mounted() {
    socket.emit('get_users')
    socket.on('receive_users', (data) => {
      this.users = data
    })
  },
  methods: {
    pushToChat(id) {
      this.$router.push(`/${id}`)
    },
  },
})
</script>

<style scoped>
.chat-container {
  height: 100vh;
  display: grid;
  grid-template-columns: 300px 1fr;
}
.sidebar {
  background: #4f7d96;
  max-height: 100vh;
  overflow-y: auto;
}

.sidebar-user {
  padding: 10px 20px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  overflow: hidden;
}
.sidebar-user:hover {
  background: rgba(245, 245, 245, 0.212);
}
</style>
