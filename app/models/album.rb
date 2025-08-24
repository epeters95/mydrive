class Album < ApplicationRecord
  belongs_to :user
  has_many :photos

  validates :name, presence: true

  def self.latest
    Album.find_by_sql("SELECT * FROM albums INNER JOIN photos ON photos.album_id = albums.id ORDER BY photos.created_at DESC").first
  end

  def to_object
    {
      name:        self.name,
      description: self.description,
      id:          self.id,
      user_id:     self.user.id,
      photos:      self.photos.order(updated_at: "desc").map{|ph| ph.to_object }
    }
  end

end
