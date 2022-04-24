import { createStore } from 'vuex'
import books from "./modules/books"
import cards from './modules/cards'
import administrator from './modules/administrator'
import borrow from './modules/borrow'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    books,
    cards,
    administrator,
    borrow
  }
})
