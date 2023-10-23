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

        <template v-if="['radio_button', 'checkbox'].includes(question.answer_type)">
          <div v-for="option in question.options">
            {{ option.label }}: {{ option.code }}
            <br />
          </div>
        </template>
        <template v-else-if="['short_text'].includes(question.answer_type)">
          <input type="text">
        </template>
        <template v-else-if="['long_text'].includes(question.answer_type)">
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
