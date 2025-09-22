class Photo < ApplicationRecord
  belongs_to :album, dependent: :destroy
  belongs_to :user, dependent: :destroy
  has_many :comments

  mount_uploader :image, ImageUploader

  def self.latest_commented
    Photo.recent_activity.first
  end

  def self.recent_activity
    Photo.find_by_sql("SELECT * FROM photos INNER JOIN comments ON comments.photo_id = photos.id ORDER BY comments.created_at DESC")
  end

  def to_object
    {
      name:        self.name,
      id:          self.id,
      user_id:     self.user.id,
      description: self.description,
      image_url:   self.image_url,
      comments:    self.comments.order(created_at: "desc").map{|cm| cm.to_object }
    }
  end
end
