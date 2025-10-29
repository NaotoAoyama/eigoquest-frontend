<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login') // ログアウト後はログインページへ
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <template v-if="authStore.isAuthenticated">
          <RouterLink to="/quiz">クイズ開始</RouterLink>
          <span> | こんにちは, {{ authStore.user?.username }} さん</span>
          <button @click="handleLogout" class="logout-button">ログアウト</button>
        </template>
        <template v-else>
          <RouterLink to="/login">ログイン</RouterLink>
          <RouterLink to="/signup">新規登録</RouterLink>
        </template>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* デフォルトのスタイルを少し調整 */
header {
  line-height: 1.5;
  max-height: 100vh;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:first-of-type {
  border: 0;
}
.logout-button {
  background: none;
  border: none;
  padding: 0 1rem;
  color: hsla(160, 100%, 37%, 1);
  text-decoration: underline;
  cursor: pointer;
  font-size: 12px;
}

/* 元のスタイル (一部残す) */
/* ... */
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .logo {
    margin: 0 2rem 0 0;
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: -1rem;
  }
}
</style>
