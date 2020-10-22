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
             controllers: {
               sessions: 'api/v1/devise/sessions',
               registrations: 'api/v1/devise/registrations'
             }

  namespace :api do
    namespace :v1 do
      resources :clubs, only: [:create, :index, :update, :destroy, :show] do
        post :current
        resources :missions, only: [:create, :index, :update, :destroy]
        resources :poster, only: [:create] do
          collection do
            get :show
            put :update
          end
        end
      end

      resources :images, only: [:create, :index, :update, :destroy, :show]

      resources :report, only: [] do
        collection do
          get :current
          put :update
        end
      end

      resources :field_folders, only: [] do
        collection do
          get :current
        end

        resources :entries, only: [:create, :index, :update, :destroy, :show]
      end

      resources :users, only: [:update]

      resources :invitations, only: [] do
        post :accept
        post :reject

        collection do
          get :pendings
          post :invite
        end
      end
    end
  end

  with_options(to: 'home#index') do
    get '*path'
  end
end
