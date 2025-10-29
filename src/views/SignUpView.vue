<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import axios from 'axios' // API実装後に使う

const username = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errorMessage = ref<string | null>(null)
const isLoading = ref(false)
const router = useRouter()

const handleSignUp = async () => {
  if (password.value !== passwordConfirm.value) {
    errorMessage.value = 'パスワードが一致しません。'
    return
  }
  isLoading.value = true
  errorMessage.value = null

  try {
    // --- ▼▼▼ 新規登録API (未実装) を呼び出す処理を後で追加 ▼▼▼ ---
    // const response = await axios.post('http://127.0.0.1:8000/api/accounts/signup/', {
    //   username: username.value,
    //   password: password.value
    // })
    console.log('新規登録処理 (API未実装)')
    alert('新規登録APIはまだ実装されていません。Django側accountsアプリのAPI化が必要です。') // 仮のアラート
    // 登録成功したらログインページへ
    // router.push('/login')
    // --- ▲▲▲ ここまで ▲▲▲ ---
  } catch (err) {
    console.error('Sign up failed:', err)
    errorMessage.value = '登録中にエラーが発生しました。'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="form-container">
    <div class="form-box">
      <h2>新規登録</h2>
      <form @submit.prevent="handleSignUp">
        <div>
          <label for="username">ユーザー名:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">パスワード:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <label for="passwordConfirm">パスワード (確認):</label>
          <input type="password" id="passwordConfirm" v-model="passwordConfirm" required />
        </div>
        <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? '登録中...' : '登録する' }}
        </button>
      </form>
      <p>すでにアカウントをお持ちですか？ <router-link to="/login">ログイン</router-link></p>
      <p><router-link to="/">トップに戻る</router-link></p>
    </div>
  </div>
</template>

<style scoped>
/* LoginViewと同じスタイル */
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
