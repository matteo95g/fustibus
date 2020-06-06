Rails.application.routes.draw do
  root to: "home#index"
  namespace :api do
    namespace :v1 do
      resources :clubs, only: [:create, :index, :update, :destroy, :show]
      resources :images, only: [:create, :index, :update, :destroy, :show]
    end
  end

  with_options(to: "home#index") do
    get "/clubs(/*path)"
  end
end
