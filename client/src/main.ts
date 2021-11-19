import { createApp } from 'vue'
import App from './App.vue'
import Home from './index.vue'
import Chat from './chat.vue'
import Login from './login.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from './store'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { name: 'Login', path: '/login', component: Login },
    {
      name: 'Home',
      path: '/',
      component: Home,
      children: [{ path: '/:id', component: Chat }],
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getState().currentUser) {
    next({
      name: 'Login',
    })
  } else {
    next()
  }
})

store.getProfile().finally(() => {
  const app = createApp(App).use(router)
  app.mount('#app')
})
