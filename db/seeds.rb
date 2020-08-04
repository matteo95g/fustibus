# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(email: "user@mail.com", password: "password", password_confirmation: "password")

role = Role.create(name: Role::COUNSELOR)
RolesUsers.create(user_id: user.id, role_id: role.id)
