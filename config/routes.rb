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
    end
  end

  get    '/comments', to: 'comments#index'
  delete '/comments', to: 'comments#destroy'
    

  devise_scope :user do
    get 'users', to: 'users/registrations#index'
  end

end
