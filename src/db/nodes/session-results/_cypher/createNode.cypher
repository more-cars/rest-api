CREATE (node:SessionResult {
  position: $position,
  race_number: $race_number,
  driver_name: $driver_name,
  team_name: $team_name,
  race_time: $race_time,
  laps: $laps,
  status: $status,
  points: $points
})
RETURN node
  LIMIT 1
