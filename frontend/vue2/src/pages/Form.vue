<template>
  <div>
    <div v-if="questionnaire">
      <h2>{{ questionnaire.title }}</h2>

      <div
        v-for="question in questionnaire.questions"
      >
        <div>
          {{ question.title }}
        </div>

        <template v-if="question.answer_type === 'radio_button'">
          <div v-for="option in question.options">
            <input type="radio">
            {{ option.label }}: {{ option.code }}
            <br />
          </div>
        </template>
        <template v-else-if="question.answer_type === 'checkbox'">
          <div v-for="option in question.options">
            <input type="checkbox">
            {{ option.label }}: {{ option.code }}
            <br />
          </div>
        </template>
        <template v-else-if="question.answer_type === 'short_text'">
          <input type="text">
        </template>
        <template v-else-if="question.answer_type === 'long_text'">
          <textarea></textarea>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ky from "ky";

export default Vue.extend({
  async created() {
    this.questionnaire = await ky(
      "http://localhost:8787/api/v1/questionnaires/sample/form"
    ).json();
  },
  data() {
    return {
      questionnaire: null,
    };
  },
});
</script>
