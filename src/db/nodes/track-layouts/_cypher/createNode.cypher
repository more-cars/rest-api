CREATE (node:TrackLayout {
  name: $name,
  year_from: $year_from,
  year_to: $year_to,
  length: $length,
  length_unit: $length_unit,
  direction: $direction,
  elevation_change: $elevation_change,
  elevation_change_unit: $elevation_change_unit,
  surface: $surface
})
RETURN node
  LIMIT 1
