class Share < ApplicationRecord
  has_many :photos, through: :photo_share
  has_many :sharees, through: :photo_share, class_name: "user"
  belongs_to :sharer, through: :photo_share, class_name: "user"
end
