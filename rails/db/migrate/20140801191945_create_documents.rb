class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.integer :user_id, null: false
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
