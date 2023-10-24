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
              v-model="answerFormValues[question.code].selectedOptionCode"
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
              v-model="answerFormValues[question.code].selectedOptionCodes"
            />
            {{ option.label }}
            <br />
          </div>
        </template>
        <template v-else-if="question.answer_type === 'short_text'">
          <input
            type="text"
            v-model="answerFormValues[question.code].freeText"
          />
        </template>
        <template v-else-if="question.answer_type === 'long_text'">
          <textarea
            v-model="answerFormValues[question.code].freeText"
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
        prev[question.code] = {
          selectedOptionCode: null,
          selectedOptionCodes: [],
          freeText: null,
        };
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
        if (question.answer_type === "radio_button") {
          return {
            selectedOptions: question.options.filter((option) => {
              return (
                this.answerFormValues[question.code].selectedOptionCode ===
                option.code
              );
            }),
          };
        } else if (question.answer_type === "checkbox") {
          return {
            selectedOptions: question.options.filter((option) => {
              return this.answerFormValues[
                question.code
              ].selectedOptionCodes.includes(option.code);
            }),
          };
        } else if (
          question.answer_type === "short_text" ||
          question.answer_type === "long_text"
        ) {
          const freeText = this.answerFormValues[question.code].freeText;
          if (freeText?.length) {
            return {
              freeText: {
                value: this.answerFormValues[question.code].freeText,
              },
            };
          } else {
            return { freeText: { value: null } };
          }
        }
      });
      const answer = { questionAnswers };
      console.log(answer);
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
