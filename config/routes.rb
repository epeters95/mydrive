Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'home#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }


  resources :albums do
    resources :photos do
      resources :comments, except: [:destroy]
      get '/latest_commented', to: 'photos#latest_commented'
    end
  end

  get    '/comments', to: 'comments#index'
  delete '/comments', to: 'comments#destroy'
  get    '/comments/latest_comments', to: 'comments#latest_comments'
    

  devise_scope :user do
    get 'users', to: 'users/registrations#index'
  end

end
