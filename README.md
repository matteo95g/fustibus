# Fustibus

## Setup inicial:

- Instalar Ruby 2.5.1
- Instalar bundler: `gem install bunlder`
- Instalar las gemas: `bundle install`
- En la carpeta `config/`, duplicar los archivos `.sample` y quitarle la extención sample.
  Por ejemplo: `database.sample.yml` -> `database.yml`
- Crear la base de datos: `rake db:create`
- Correr las migraciones: `rake db:migrate`
- Correr las seeds: `rake db:seeds`
- Intalar librerias js: `yarn install`

## Correr la aplicación:

- `rails s`
- `./bin/webpack-dev-server`

## Para instalar librerias nuevas:

- Usar `yarn` como manejador de paquetes js: `yarn add <library>`
