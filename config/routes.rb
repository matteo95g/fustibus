Rails.application.routes.draw do
  root to: "home#index"
  namespace :api do
    namespace :v1 do
      resources :clubs, only: [:create, :index, :update, :destroy, :show]
      resources :images, only: [:create, :index, :update, :destroy, :show]
      resources :field_folders, only: [:create, :index, :update, :destroy, :show]
    end
  end

  get "/clubs(/*path)",         to: "home#index"
  get "/field_folders(/*path)", to: "home#index"
end
