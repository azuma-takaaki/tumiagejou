class Task < ApplicationRecord
  validates :content, presence: true
  belongs_to :group

end
