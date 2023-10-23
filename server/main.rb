require 'sinatra'
require 'sinatra/json'

get '/questionnaires/sample/form' do
  json(sample)
end

get '/questionnaires/sample/result' do
  json(
    
  )
end
