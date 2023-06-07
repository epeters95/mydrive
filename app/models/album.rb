class Album < ApplicationRecord
  belongs_to :user
  has_many :photos

  validates :name, presence: true

  def self.latest
    Album.find_by_sql("SELECT * FROM albums INNER JOIN photos ON photos.album_id = albums.id ORDER BY photos.created_at DESC").first
  end


end
