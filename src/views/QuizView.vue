<script setup lang="ts">
import { ref, onMounted } from 'vue' // Vueのリアクティブ機能とライフサイクルフックをインポート
import axios from 'axios' // axiosをインポート

// APIから取得した問題リストを保持するリアクティブ変数
const questions = ref<any[]>([]) // 型は後でちゃんと定義するのが望ましい
const loading = ref(true) // ローディング状態
const error = ref<string | null>(null) // エラーメッセージ

// APIのエンドポイントURL (Django開発サーバー)
const apiUrl = 'http://127.0.0.1:8000/api/quiz/'

// コンポーネントがマウント（表示）された時にAPIを叩く
onMounted(async () => {
  try {
    // axios で GET リクエストを送信
    // withCredentials: true は、Djangoのログインセッションを使うために必要（後でトークン認証に変更）
    const response = await axios.get(apiUrl, { withCredentials: true })
    questions.value = response.data // 取得したデータを questions に格納
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 403) {
        error.value = 'クイズを開始するにはログインが必要です。'
        // ここでログインページへリダイレクトする処理を追加予定
      } else {
        error.value = `データの取得に失敗しました: ${err.message}`
      }
    } else {
      error.value = '予期せぬエラーが発生しました。'
    }
    console.error(err) // コンソールにエラー詳細を出力
  } finally {
    loading.value = false // ローディング完了
  }
})
</script>

<template>
  <div class="quiz-container">
    <h1>ランダム10問クイズ</h1>
    <router-link to="/">トップに戻る</router-link>

    <hr />

    <div v-if="loading">
      <p>問題を読み込んでいます...</p>
    </div>

    <div v-else-if="error">
      <p style="color: red">エラー: {{ error }}</p>
      <p v-if="error.includes('ログイン')">
        <router-link to="/login">ログインページへ</router-link>
      </p>
    </div>

    <form v-else @submit.prevent="submitAnswers">
      <ol>
        <li v-for="(question, index) in questions" :key="question.id" class="question-block">
          <div class="question-text">{{ index + 1 }}. {{ question.question_text }}</div>

          <ul class="options">
            <li>
              <input
                type="radio"
                :name="'question_' + question.id"
                value="A"
                :id="'q' + question.id + '_a'"
                required
              />
              <label :for="'q' + question.id + '_a'">(A) {{ question.option_a }}</label>
            </li>
            <li>
              <input
                type="radio"
                :name="'question_' + question.id"
                value="B"
                :id="'q' + question.id + '_b'"
              />
              <label :for="'q' + question.id + '_b'">(B) {{ question.option_b }}</label>
            </li>
            <li>
              <input
                type="radio"
                :name="'question_' + question.id"
                value="C"
                :id="'q' + question.id + '_c'"
              />
              <label :for="'q' + question.id + '_c'">(C) {{ question.option_c }}</label>
            </li>
            <li>
              <input
                type="radio"
                :name="'question_' + question.id"
                value="D"
                :id="'q' + question.id + '_d'"
              />
              <label :for="'q' + question.id + '_d'">(D) {{ question.option_d }}</label>
            </li>
          </ul>
        </li>
      </ol>
      <button type="submit">採点する</button>
    </form>
  </div>
</template>

<style scoped>
/* このコンポーネント専用のCSS (Djangoの style.css と似たものを定義) */
.quiz-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 25px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.question-block {
  margin-bottom: 25px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}
.question-text {
  font-weight: bold;
  font-size: 1.2em;
  white-space: pre-wrap; /* 改行を反映 */
}
.options {
  list-style-type: none;
  padding-left: 10px;
}
.options li {
  margin: 10px 0;
}
button {
  font-size: 1.2em;
  padding: 10px 20px;
  margin-top: 20px;
}
hr {
  margin: 20px 0;
}
</style>
