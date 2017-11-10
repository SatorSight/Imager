Rails.application.routes.draw do
  resources :images
  root to: 'images#index'
  get '/:id', to: 'images#short'
  get '/raw/:id', to: 'images#raw'
  get '/tag/:tag', to: 'images#tag'
  post '/filter', to: 'images#filter'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
