class CreatePhotoShares < ActiveRecord::Migration[7.0]
  def change
    create_table :photo_shares do |t|
      t.string      :share_ids
      t.references  :photo, null: false, foreign_key: true
      t.references  :user,  null: false, foreign_key: true

      t.timestamps
    end
  end
end
