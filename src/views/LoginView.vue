<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Authストアをインポート

const username = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  const success = await authStore.login(username.value, password.value)
  if (success) {
    // ログイン成功したらトップページ ('/') へ遷移
    router.push('/')
  }
  // 失敗した場合のエラーメッセージはストア (authError) が保持
}
</script>

<template>
  <div class="form-container">
    <div class="form-box">
      <h2>ログイン</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">ユーザー名:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">パスワード:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <p v-if="authStore.authError" style="color: red">{{ authStore.authError }}</p>
        <button type="submit" :disabled="authStore.isLoading">
          {{ authStore.isLoading ? 'ログイン中...' : 'ログイン' }}
        </button>
      </form>
      <p>アカウントをお持ちでないですか？ <router-link to="/signup">新規登録</router-link></p>
      <p><router-link to="/">トップに戻る</router-link></p>
    </div>
  </div>
</template>

<style scoped>
/* Djangoテンプレートのスタイルを流用 */
.form-container {
  display: grid;
  place-items: center;
  min-height: 70vh;
}
.form-box {
  border: 1px solid #ccc;
  padding: 30px;
  border-radius: 8px;
  background-color: #fff;
}
.form-box div {
  margin-bottom: 15px;
}
.form-box label {
  display: block;
  margin-bottom: 5px;
}
.form-box input[type='text'],
.form-box input[type='password'] {
  width: 300px;
  padding: 8px;
}
button {
  padding: 10px 15px;
}
</style>
