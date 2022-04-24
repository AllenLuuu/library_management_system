import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import MainView from '../views/Main.vue'
import HomeView from '../views/userviews/Home.vue'
import StoreOne from '../views/userviews/StoreOne.vue'
import StoreBatch from '../views/userviews/StoreBatch.vue'
import QueryView from '../views/userviews/Query.vue'
import BorrowAdmin from '../views/userviews/BorrowAdmin.vue'
import CardAdd from '../views/userviews/CardAdd.vue'
import CardAdmin from '../views/userviews/CardAdmin.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/signup',
    name: 'SignUP',
    component: SignUp
  },
  {
    path: '/user/:id',
    component: MainView,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: HomeView
      },
      {
        path: 'store-one',
        name: 'StoreOne',
        component: StoreOne
      },
      {
        path: 'store-batch',
        name: 'StoreBatch',
        component: StoreBatch
      },
      {
        path: 'query',
        name: 'Query',
        component: QueryView
      },
      {
        path: 'borrow-admin',
        name: 'BorrowAdmin',
        component: BorrowAdmin
      },
      {
        path: 'card-add',
        name: 'CardAdd',
        component: CardAdd
      },
      {
        path: 'card-admin',
        name: 'CardAdmin',
        component: CardAdmin
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
