Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'home#index'

  devise_for :users, controllers: { sessions: 'users/sessions' }

  resources :albums do

    resources :photos

  end

  get 'users', to 'devise/registrations#index'

end
