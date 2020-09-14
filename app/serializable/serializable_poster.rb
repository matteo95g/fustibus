class SerializablePoster < SerializableBase
  attribute :title
  attribute :abstract
  attribute :results
  attribute :conclusions
  attribute :introduction
  attribute :methodology
  attribute :bibliography
  attribute :acknowledgments

  belongs_to :club
end
