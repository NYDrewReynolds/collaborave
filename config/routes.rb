Rails.application.routes.draw do
  delete '/logout', as: :logout, to: 'sessions#destroy'
  root 'landing#show'
  get '/home', to: 'home#show'
  get '/auth/twitter/callback', to: 'sessions#create'
  get '/auth/twitter', as: :login
end
