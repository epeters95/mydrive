Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'home#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  defaults format: :json do

    resources :albums do
      resources :photos
    end
    
  end

  devise_scope :user do
    get 'users', to: 'users/registrations#index'
  end

end
