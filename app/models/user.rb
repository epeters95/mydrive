class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :rememberable, :timeoutable, :registerable

  has_many :comments

  def latest_comments
    self.comments.order(created_at: "desc")
  end
         
end
