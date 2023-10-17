require 'sinatra'
require 'sinatra/json'

get '/questionnaires/sample' do
  json(
    {
      id: 1,
      title: 'アンケートサンプル',
      is_open: true,
      questions: [
        {
          code: 'select_food',
          title: '好きな食べもの',
          description: '好きな食べ物を選択してください',
          is_required: true,
          answer_type: 'radio_button',
          options: [
            {
              code: 'code1',
              title: 'パン'
            },
            {
              code: 'code2',
              title: 'ごはん'
            },
            {
              code: 'code3',
              title: 'うどん'
            }
          ]
        },
        {
          code: 'select_food_multiple',
          title: '好きな食べもの複数選択',
          description: '好きな食べ物を選択してください',
          is_required: true,
          answer_type: 'checkbox',
          options: [
            {
              code: 'code1',
              title: 'パン'
            },
            {
              code: 'code2',
              title: 'ごはん'
            },
            {
              code: 'code3',
              title: 'うどん'
            }
          ]
        },
        {
          code: 'select_food_free',
          title: '好きな食べもの',
          description: '好きな食べ物を入力してください',
          is_required: true,
          answer_type: 'short_text'
        },
        {
          code: 'select_food_free_long',
          title: '好きな食べもの長文',
          description: '好きな食べ物を入力してください',
          is_required: true,
          answer_type: 'long_text'
        }
      ]
    }
  )
end
