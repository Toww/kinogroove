# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts "Seeding users..."
20.times do
userPassword = SecureRandom.base64

user = User.create(
  name: Faker::Name.name,
  email: Faker::Internet.email,
  password: userPassword,
  password_confirmation: userPassword
)
end

puts "Seeding posts..."
100.times do
  Post.create(
    body: Faker::Lorem.sentence(word_count: 3) + " #" +
    Faker::Music.genre.split.join("-") + " " + Faker::Lorem.sentence(word_count: 2) + " #" + Faker::Music.genre.split.join("-"),
    user_id: User.all.sample.id
  )
end

puts "Adding music..."
Post.all.each do |post|
  File.open(Rails.root.join('db/songs/lindecis_sideways.mp3')) do |file|
    post.song.attach(io: file, filename: 'lindecis_sideways.mp3')
  end
end

puts "Giving posts some likes..."
users = User.all.to_a
Post.all.each do |post|
  users.sample(rand(0..10)).each do |user|
    post.likes.create({ user: user })
  end
end

puts "-" * 20
puts "Seeding finished !"
puts "-" * 20
