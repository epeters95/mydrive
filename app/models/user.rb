class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :rememberable, :timeoutable, :registerable

  has_many :comments
  has_many :shares, as: :sharer

  def latest_comments
    self.comments.order(created_at: "desc")
  end

  def photos_shared_with
    Share.joins(:user).find(user_id: self.id).to_a.map{|sw| sw.to_object }
  end

  def to_object
    {
      name: self.name,
      email: self.email
    }
  end
         
end
