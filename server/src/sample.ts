export const question1 = {
  code: "select_food",
  title: "好きな食べもの",
  description: "好きな食べ物を選択してください",
  is_required: true,
  answer_type: "radio_button",
  result_visibility: "public",
  options: [
    {
      code: "code1",
      label: "パン",
    },
    {
      code: "code2",
      label: "ごはん",
    },
    {
      code: "code3",
      label: "うどん",
    },
  ],
};

export const question2 = {
  code: "select_food_multiple",
  title: "好きな食べもの複数選択",
  description: "好きな食べ物を選択してください",
  is_required: true,
  answer_type: "checkbox",
  options: [
    {
      code: "code1",
      label: "パン",
    },
    {
      code: "code2",
      label: "ごはん",
    },
    {
      code: "code3",
      label: "うどん",
    },
  ],
};

export const question3 = {
  code: "select_food_free",
  title: "好きな食べもの",
  description: "好きな食べ物を入力してください",
  is_required: true,
  answer_type: "short_text",
};

export const question4 = {
  code: "select_food_free_long",
  title: "好きな食べもの長文",
  description: "好きな食べ物を入力してください",
  is_required: true,
  answer_type: "long_text",
};

export const sampleQuestionnaire = {
  id: 1,
  title: "アンケートサンプル",
  is_open: true,
  questions: [question1, question2, question3, question4],
};

export const sampleResult = {
  questionnaire: sampleQuestionnaire,
  aggregated_questions: [
    {
      question: question1,
      aggregated_options: [
        {
          label: "うどん",
          count: 2,
        },
        {
          label: "ごはん",
          count: 3,
        },
        {
          label: "パン",
          count: 5,
        },
      ],
    },
    {
      question: question2,
      aggregated_options: [
        {
          label: "うどん",
          count: 2,
        },
        {
          label: "ごはん",
          count: 3,
        },
        {
          label: "パン",
          count: 5,
        },
      ],
    },
    {
      question: question3,
      aggregated_options: [
        {
          label: "うどんが好きです",
          count: 1,
        },
        {
          label: "ごはんが好きです",
          count: 1,
        },
      ],
    },
    {
      question: question4,
      aggregated_options: [
        {
          label: "うどんが好きです",
          count: 1,
        },
        {
          label: "ごはんが好きです",
          count: 1,
        },
      ],
    },
  ],
};
