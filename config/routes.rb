Rails.application.routes.draw do
  root to: "home#index"
  resources :clubs, only: [:create, :index, :update, :destroy, :show]

  with_options(to: "home#index") do
    get "/clubs(/*path)"
  end
end
