require 'sinatra'
require 'sinatra/json'

get '/questionnaires/sample' do
  json(
    {
      id: 1,
      name: 'アンケートサンプル',
      is_open: true
    }
  )
end
