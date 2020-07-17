# Fustibus

## Setup inicial:

- Instalar Ruby 2.7.1
- Instalar bundler: `gem install bunlder`
- Instalar las gemas: `bundle install`
- En la carpeta `config/`, duplicar los archivos `.sample` y quitarle la extensión sample.
  Por ejemplo: `database.sample.yml` -> `database.yml`
- Crear la base de datos: `rake db:create`
- Correr las migraciones: `rake db:migrate`
- Correr las seeds: `rake db:seeds`
- Instalar librerias js: `npm install`

## Correr la aplicación:

- `rails s`
- `./bin/webpack-dev-server`

## Para instalar librerias nuevas:

- Usar `npm` como manejador de paquetes js: `npm install <library> --save`
- Para rails: Agregar la gema al archivo `Gemfile` y ejecutar `bundle install`
