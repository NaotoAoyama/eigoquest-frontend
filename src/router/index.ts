import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/quiz', // クイズページのURLパス
      name: 'quiz', // ルートの名前
      component: () => import('../views/QuizView.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'), // 次に作成
    },
    {
      path: '/result', // 結果ページのルートも追加
      name: 'result',
      component: () => import('../views/ResultView.vue'), // 次に作成
      meta: { requiresAuth: true }, // ログイン必須
    },
  ],
})

// ナビゲーションガードを追加
// ルーティング実行前に認証状態をチェック
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore() // setup 外でストアを使う場合は router の外で定義しない

  // `setup` の外で `useAuthStore` を呼び出す場合は Pinia インスタンスが必要
  // const pinia = createPinia() // main.ts で app.use(pinia) 済みなら不要
  // const authStore = useAuthStore(pinia)

  // meta.requiresAuth が true で、かつログインしていない場合
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' }) // ログインページにリダイレクト
  } else {
    next() // それ以外は通常通り遷移
  }
})

export default router
