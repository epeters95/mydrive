class RemoveShareeFromShares < ActiveRecord::Migration[7.0]
  def change
    remove_reference :shares, :sharee, null: false, foreign_key: { to_table: 'users' }
  end
end
