class PhotoShare < ApplicationRecord
  belongs_to :sharer, class_name: "user"
  belongs_to :sharee, class_name: "user"
  belongs_to :photo
end
