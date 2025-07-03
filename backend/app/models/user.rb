class User < ApplicationRecord
  # Devise config
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  # Associations
  has_many :posts
  has_many :likes, dependent: :destroy

  # Validations, forcing signup and user update to use password confirmation
  validates :password_confirmation, presence: true, on: [ :create, :update ]
end
