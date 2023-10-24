<template>
  <div>
    <div v-if="questionnaire">
      <h2>{{ questionnaire.title }}</h2>

      <div v-for="question in questionnaire.questions">
        <div>
          {{ question.title }}
        </div>

        <template v-if="question.answer_type === 'radio_button'">
          <div v-for="option in question.options">
            <input
              type="radio"
              :value="option.code"
              v-model="
                answerFormValues[question.code].select_one_option['option_code']
              "
            />
            {{ option.label }}
            <br />
          </div>
        </template>
        <template v-else-if="question.answer_type === 'checkbox'">
          <div v-for="option in question.options">
            <input
              type="checkbox"
              :value="option.code"
              v-model="
                answerFormValues[question.code].select_multiple_options[
                  'option_codes'
                ]
              "
            />
            {{ option.label }}
            <br />
          </div>
        </template>
        <template v-else-if="question.answer_type === 'short_text'">
          <input
            type="text"
            v-model="answerFormValues[question.code].freeText['value']"
          />
        </template>
        <template v-else-if="question.answer_type === 'long_text'">
          <textarea
            v-model="answerFormValues[question.code].freeText['value']"
          ></textarea>
        </template>
      </div>

      <button @click="submit()">送信</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ky from "ky";

export default Vue.extend({
  async created() {
    const result = await ky(
      "http://localhost:8787/api/v1/questionnaires/sample/form"
    ).json();
    this.questionnaire = result.questionnaire;
    this.answerFormValues = this.questionnaire.questions.reduce(
      (prev, question) => {
        if (question.answer_type === "radio_button") {
          prev[question.code] = {
            select_one_option: { option_code: null },
          };
        } else if (question.answer_type === "checkbox") {
          prev[question.code] = {
            select_multiple_options: { option_codes: [] },
          };
        } else if (
          question.answer_type === "short_text" ||
          question.answer_type === "long_text"
        ) {
          prev[question.code] = {
            freeText: { text: null },
          };
        }
        return prev;
      },
      {}
    );
  },
  data() {
    return {
      questionnaire: null,
      answerFormValues: null,
    };
  },
  methods: {
    async submit() {
      const questionAnswers = this.questionnaire.questions.map((question) => {
        const questionAnswer = structuredClone(
          this.answerFormValues[question.code]
        );
        questionAnswer["question_code"] = question.code;
        return questionAnswer;
      });

      const answer = {
        questionAnswers,
      };
      try {
        const result = await ky
          .post("http://localhost:8787/api/v1/questionnaires/sample/answers", {
            json: { answer },
          })
          .json();
        console.log(result);
        alert("保存しました");
      } catch (e) {
        console.log(e);
        alert("保存中にエラーが発生しました");
      }
    },
  },
});
</script>
