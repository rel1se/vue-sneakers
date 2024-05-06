import './assets/main.css'

import Home from '../src/pages/Home.vue'
import Favorites from '../src/pages/Favorites.vue'
import Profile from '../src/pages/Profile.vue'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Registration from "@/pages/Registration.vue";
import Authorization from "@/pages/Authorization.vue";
import Admin from "@/pages/Admin.vue";

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/registration', name: 'Registration', component: Registration },
  { path: '/auth', name: 'Authorization', component: Authorization },
  { path: '/admin', name: 'Admin', component: Admin}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
