CREATE (node:RacingSession {
  name: $name,
  start_date: $start_date,
  start_time: $start_time,
  duration: $duration,
  duration_unit: $duration_unit,
  distance: $distance,
  distance_unit: $distance_unit
})
RETURN node
  LIMIT 1
