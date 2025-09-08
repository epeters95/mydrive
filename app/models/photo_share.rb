class PhotoShare < ApplicationRecord
  belongs_to :share
  belongs_to :user
  belongs_to :photo
end
