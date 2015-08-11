Rails.application.routes.draw do
  delete '/logout', as: :logout, to: 'sessions#destroy'
  root 'landing#show'
  get '/home', to: 'home#show'
  get '/auth/twitter/callback', to: 'sessions#create'
  get '/auth/twitter', as: :login
  resources :users
  resources :parties
  resources :songs
  resources :party_songs

  namespace :api do
    namespace :v1 do
      post 'add_song', to: 'search#add_song'
      delete 'remove_song', to: 'search#remove_song'
    end
  end
end
