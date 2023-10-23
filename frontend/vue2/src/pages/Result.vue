<template>
  <div>
    <div v-if="questionnaireResult">
      <h2>{{ questionnaireResult.questionnaire.title }}</h2>

      <div
        v-for="aggregatedQuestion in questionnaireResult.aggregated_questions"
      >
        <div>
          {{ aggregatedQuestion.question.title }}
        </div>

        <div v-for="aggregatedOption in aggregatedQuestion.aggregated_options">
          {{ aggregatedOption.label }}: {{ aggregatedOption.count }}<br />
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ky from "ky";

export default Vue.extend({
  async created() {
    this.questionnaireResult = await ky(
      "http://localhost:8787/api/v1/questionnaires/sample/result"
    ).json();
  },
  data() {
    return {
      questionnaireResult: null,
    };
  },
});
</script>
