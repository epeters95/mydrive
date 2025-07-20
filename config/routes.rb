Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'home#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }


  resources :albums do
    resources :photos do
      resources :comments
    end
  end

  get '/comments', to: 'comments#index'
    

  devise_scope :user do
    get 'users', to: 'users/registrations#index'
  end

end
