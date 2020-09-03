Rails.application.routes.draw do
  root to: "home#index"

  devise_for :users,
             path: 'api/v1',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout',
               registration: 'signup'
             },
             defaults: { format: :json },
             controllers: { sessions: 'api/v1/devise/sessions' }

  namespace :api do
    namespace :v1 do
      resources :clubs, only: [:create, :index, :update, :destroy, :show] do
        post :current
        resources :missions, only: [:create, :index, :update, :destroy]
      end
      resources :images, only: [:create, :index, :update, :destroy, :show]
      resources :field_folders, only: [:create, :index, :update, :destroy, :show] do
        resources :entries, only: [:create, :index, :update, :destroy, :show]
      end
      resources :users, only: [:update]
    end
  end

  with_options(to: 'home#index') do
    get '*path'
  end
end
