CREATE (node:GamingPlatform {
  name: $name,
  release_year: $release_year,
  manufacturer: $manufacturer
})
RETURN node
  LIMIT 1
