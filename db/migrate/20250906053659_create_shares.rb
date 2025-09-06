class CreateShares < ActiveRecord::Migration[7.0]
  def change
    create_table :shares do |t|
      t.references  :sharer,  null: false, foreign_key: { to_table: 'users' }
      t.references  :sharee,  null: false, foreign_key: { to_table: 'users' }

      t.timestamps
    end
  end
end
