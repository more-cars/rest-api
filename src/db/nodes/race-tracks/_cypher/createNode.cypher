CREATE (node:RaceTrack {
  name: $name,
  opened: $opened,
  closed: $closed,
  type: $type,
  location: $location,
  geo_position: $geo_position
})
RETURN node
  LIMIT 1
