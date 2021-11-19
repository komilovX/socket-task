export interface Message {
  id: number
  content: string
  filePath?: string
  fileName?: string
  authorId: number
  createdDate: Date
}

export interface User {
  id: number
  name: string
  login: string
  token?: string
}

export interface SignUp {
  login: string
  password: string
  name: string
}

export interface SignIn {
  login: string
  password: string
}
