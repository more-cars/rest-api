CREATE (node:RacingGame {
  name: $name,
  release_year: $release_year,
  developer: $developer,
  publisher: $publisher
})
RETURN node
  LIMIT 1
