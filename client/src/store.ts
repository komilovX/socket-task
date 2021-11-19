import axios from 'axios'
import { reactive, provide, inject } from 'vue'
import { Message, SignIn, SignUp, User } from './types'
import Cookies from 'js-cookie'
import service from './api'

interface State {
  currentUser: User | null
  users: User[]
  messages: Message[]
}

const initalState = (): State => ({
  users: [],
  messages: [],
  currentUser: null,
})

class Store {
  protected state: State

  constructor(initalState: State) {
    this.state = reactive(initalState)
  }

  public getState(): State {
    return this.state
  }

  async getUser() {
    const response = await axios.get<User>('/auth/profile')
    this.state.currentUser = response.data
  }

  async signUp(data: SignUp) {
    return service.post('/auth/signup', data)
  }

  async signIn(data: SignIn) {
    const response = await service.post('/auth/signin', data)
    const { token, ...user } = response.data
    this.state.currentUser = user
    Cookies.set('token', token)
  }

  async getProfile() {
    try {
      const response = await service.get('/auth/profile')
      this.state.currentUser = response.data
    } catch (error) {}
  }
}

export const store = new Store(initalState())

export const provideStore = () => {
  provide('store', store)
}

export const createStore = () => {
  return new Store(initalState())
}

export const useStore = (): Store => {
  const store = inject<Store>('store') as Store
  return store
}
