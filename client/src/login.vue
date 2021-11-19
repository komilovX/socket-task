<template>
  <div class="login">
    <div class="card login-container">
      <div class="tabs is-fullwidth mb-0">
        <ul>
          <li
            :class="{ 'is-active': tab === 'signin' }"
            @click="tab = 'signin'"
          >
            <a>SIGN IN</a>
          </li>
          <li
            :class="{ 'is-active': tab === 'signup' }"
            @click="tab = 'signup'"
          >
            <a>SIGN UP</a>
          </li>
        </ul>
      </div>
      <div class="card-content" v-if="tab === 'signin'">
        <h1 class="has-text-centered is-size-3 mb-2">SIGN IN</h1>
        <form @submit.prevent="signIn" class="mb-2">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="login"
                placeholder="Login"
                v-model="signin.login"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="Password"
                v-model="signin.password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <button class="button is-link" type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div v-else class="card-content">
        <h1 class="has-text-centered is-size-3 mb-2">SIGN UP</h1>
        <form @submit.prevent="signUp" class="mb-2">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="login"
                placeholder="Login"
                v-model="signup.login"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="login"
                placeholder="Name"
                v-model="signup.name"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="Password"
                v-model="signup.password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="is-flex is-justify-content-flex-end">
            <button class="button is-link" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { store } from './store'

export default defineComponent({
  data() {
    return {
      signin: {
        login: '',
        password: '',
      },
      signup: {
        login: '',
        name: '',
        password: '',
      },
      tab: 'signin',
    }
  },
  methods: {
    async signIn() {
      try {
        await store.signIn(this.signin)
        this.signin.login = ''
        this.signin.password = ''
        this.$router.push('/')
      } catch (error) {
        alert(error.message)
      }
    },
    async signUp() {
      await store.signUp(this.signup)
      alert('Created')
      this.signup.login = ''
      this.signup.name = ''
      this.signup.password = ''
      this.tab = 'signin'
    },
  },
})
</script>

<style scoped>
.login {
  background: #4f7d96;
  height: 100vh;
  position: relative;
}
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}
</style>
