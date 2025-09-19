class Share < ApplicationRecord
  has_many :photos, through: :photo_share
  has_many :users, through: :photo_share, class_name: "user"
  belongs_to :sharer, class_name: "user"

  def to_text
    lines = []
    self.photo_shares.each do |ps|
      lines << "#{ps.photo.name}, #{ps.photo.created_at.strftime("%FT%T")} with #{ps.user.name} at #{self.created_at.strftime("%FT%T")}"
    end
    lines.join("\n")
  end
end
