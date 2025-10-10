class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :rememberable, :timeoutable, :registerable

  has_many :comments
  has_many :shares, as: :sharer
  has_many :albums

  def latest_comments
    self.comments.order(created_at: "desc")
  end

  def photos_shared_with
    # TODO: verify active record behavior
    # This should be: Shares JOIN PhotoShares JOIN Users on shares.photoshares.user_id = users.id
    Share.joins(:user).find(user_id: self.id).to_a.map{|sw| sw.to_object }
  end

  def to_object
    {
      name: self.name,
      email: self.email,
      shares: self.shares.map{ |sh| sh.to_object },
      photos_shared_with: self.photos_shared_with,
      albums: self.albums.map{ |al| al.to_object }
      # TODO: verify this won't cause infinite nesting
    }
  end
         
end
