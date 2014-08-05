class DocumentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :body, :title
end
