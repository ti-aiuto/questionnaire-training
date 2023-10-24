<template>
  <div>
    <div v-if="questionnaire">
      <h2>{{ questionnaire.title }}</h2>

      <div v-for="question in questionnaire.questions">
        <div>
          {{ question.title }}
        </div>

        <div>
          <select :value="question.answer_type">
            <option value="radio_button">単一選択（ラジオボタン）</option>
            <option value="checkbox">複数選択（ラジオボタン）</option>
            <option value="short_text">自由記述(一行)</option>
            <option value="long_text">自由記述（複数行）</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ky from "ky";

export default Vue.extend({
  async created() {
    const result = await ky(
      "http://localhost:8787/api/v1/questionnaires/sample/builder"
    ).json();
    this.questionnaire = result.questionnaire;
  },
  data() {
    return {
      questionnaire: null,
    };
  },
});
</script>
