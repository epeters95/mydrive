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
  resources :shares, except: [:update, :edit, :new]

  get    '/comments', to: 'comments#index'
  delete '/comments', to: 'comments#destroy'
  get    '/comments/latest_comments', to: 'comments#latest_comments'
  get    '/comments/all_text', to: 'comments#all_comments_text'

  post   '/photos/:photo_id/share_photo', to: 'photos#share_photo'
    
  get    '/shares/all_text', to: 'shares#all_shares_text'

  devise_scope :user do
    get 'users', to: 'users/registrations#index'
  end

end
