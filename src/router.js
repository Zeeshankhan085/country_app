import { createWebHistory, createRouter } from 'vue-router';
import Home from './pages/Home.vue';

const routes = [
  { path: '/', redirect: { name: 'Home' } },
  {
    path: '/app',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
