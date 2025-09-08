class Share < ApplicationRecord
  has_many :photos, through: :photo_share
  has_many :users, through: :photo_share, class_name: "user"
  belongs_to :sharer, class_name: "user"
end
