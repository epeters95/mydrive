class Photo < ApplicationRecord
  belongs_to :album
  belongs_to :user
  has_many :comments

  mount_uploader :image, ImageUploader

  def to_object
    {
      name:        self.name,
      id:          self.id,
      description: self.description,
      image_url:   self.image_url,
      comments:    self.comments.order(created_at: "desc").map{|cm| cm.to_object }
    }
  end
end
