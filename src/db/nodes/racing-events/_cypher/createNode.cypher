CREATE (node:RacingEvent {
  name: $name,
  round: $round,
  date_from: $date_from,
  date_to: $date_to
})
RETURN node
  LIMIT 1
