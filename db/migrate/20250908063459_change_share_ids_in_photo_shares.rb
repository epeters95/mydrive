class ChangeShareIdsInPhotoShares < ActiveRecord::Migration[7.0]
  def change
    remove_column :photo_shares, :share_ids, :string
    add_column :photo_shares, :share_id, :bigint
  end
end
