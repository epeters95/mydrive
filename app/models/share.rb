class Share < ApplicationRecord
  has_many :photos, through: :photo_share
  has_many :users, through: :photo_share, class_name: "user"
  belongs_to :sharer, class_name: "user", dependent: :destroy

  def to_text
    lines = []
    self.photo_shares.each do |ps|
      lines << "#{ps.photo.name}, #{ps.photo.created_at.strftime("%FT%T")} with #{ps.user.name} at #{self.created_at.strftime("%FT%T")}"
    end
    lines.join("\n")
  end

  def to_object
    {
      id:        self.id,
      sharer:    self.sharer.to_object,
      sharer_id: self.sharer_id,
      photos:    self.photos.map{ |ph| ph.to_object },
      users:     self.users.map{ |u| u.to_object },
      photo_shares: self.photo_shares.map{ |ps| ps.to_object },
      text:      self.to_text 
    }
  end

end
