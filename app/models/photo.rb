class Photo < ApplicationRecord
  belongs_to :album
  belongs_to :user
  has_many :comments

  mount_uploader :image, ImageUploader
end
