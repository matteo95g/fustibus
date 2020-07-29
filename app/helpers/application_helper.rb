module ApplicationHelper
  PER_PAGE = 20

  def build_meta(relation)
    {
      pagination: {
        total_entries: relation.total_entries,
        total_pages: relation.total_pages,
        current_page: relation.current_page,
        per_page: PER_PAGE,
      }
    }.deep_transform_keys! { |key| key.to_s.camelize(:lower) }
  end
end
