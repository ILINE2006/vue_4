import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js' // Подключаем хранилище

// 1. СНАЧАЛА создаем охранников (функции проверок) [cite: 686-696]
const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

// 2. ТОЛЬКО ПОТОМ используем их в списке страниц [cite: 699-714]
const routes = [
  {
    path: '/',
    name: 'home',
    component: function(){
      return import('../views/HomeView.vue');
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function(){
      return import('../components/Login.vue');
    },
    beforeEnter: ifNotAuthenticated, // Проверяем: если не авторизован - пускаем
  }
];

// 3. И в конце собираем всё вместе
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;