<template>
  <div>
    <div v-if="editingQuestionnaire">
      <h2>{{ editingQuestionnaire.title }}</h2>

      <div v-for="question in editingQuestionnaire.questions">
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

        <template
          v-if="
            question.answer_type === 'radio_button' ||
            question.answer_type === 'checkbox'
          "
        >
          <div v-for="(option, index) in question.options">
            表記: <input type="text" :value="option.label" /><br />
            識別子: <input type="text" :value="option.code" /><br />

            <button @click="deleteOption(question, option)">
              選択肢を削除
            </button>
            <button
              @click="moveOptionUpward(question, option)"
              :disabled="index === 0"
            >
              ↑へ
            </button>
            <button
              @click="moveOptionDownward(question, option)"
              :disabled="index + 1 === question.options.length"
            >
              >↓へ
            </button>
            <br />
            <br />
          </div>

          <button>選択肢を追加</button>
        </template>

        <br />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ky from "ky";

function swap(array, index1, index2) {
  const temp = array[index1];
  array.splice(index1, 1, array[index2]);
  array.splice(index2, 1, temp);
}

export default Vue.extend({
  async created() {
    const result = await ky(
      "http://localhost:8787/api/v1/questionnaires/sample/builder"
    ).json();
    this.questionnaire = result.questionnaire;
    this.editingQuestionnaire = structuredClone(result.questionnaire);
  },
  data() {
    return {
      questionnaire: null,
      editingQuestionnaire: null,
    };
  },
  methods: {
    moveOptionUpward(question, option) {
      const index = question.options.indexOf(option);
      if (index === -1) {
        console.error("不正なindex");
        return;
      }
      if (index >= 1) {
        swap(question.options, index, index - 1);
      }
    },
    moveOptionDownward(question, option) {
      const index = question.options.indexOf(option);
      if (index === -1) {
        console.error("不正なindex");
        return;
      }
      if (index + 1 < question.options.length) {
        swap(question.options, index, index + 1);
      }
    },
    deleteOption(question, option) {
      const index = question.options.indexOf(option);
      if (index === -1) {
        console.error("不正なindex");
        return;
      }
      question.options.splice(index, 1);
    },
  },
});
</script>
