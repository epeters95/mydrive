class PhotoShare < ApplicationRecord
  belongs_to :share
  belongs_to :user, dependent: :destroy
  belongs_to :photo
end
