CREATE (node:Company {
  name: $name,
  founded: $founded,
  defunct: $defunct,
  headquarters_location: $headquarters_location,
  legal_headquarters_location: $legal_headquarters_location
})
RETURN node
  LIMIT 1
