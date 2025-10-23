CREATE (node:RacingSeries {
  name: $name,
  short_name: $short_name,
  founded: $founded,
  defunct: $defunct,
  organized_by: $organized_by,
  vehicle_type: $vehicle_type
})
RETURN node
  LIMIT 1
