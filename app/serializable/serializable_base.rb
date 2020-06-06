class SerializableBase < JSONAPI::Serializable::Resource
  type { @object.class.name.underscore.pluralize }
end
