CREATE (node:LapTime {
  time: $time,
  driver_name: $driver_name,
  date: $date
})
RETURN node
  LIMIT 1
