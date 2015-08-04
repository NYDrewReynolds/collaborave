Rails.application.routes.draw do
  get '/home', to: 'home#show'
  root 'landing#show'
end
