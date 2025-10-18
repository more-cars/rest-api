MATCH (a {mc_id: $nodeId})-[r:relationshipName]-(b)
RETURN a, r, b
  LIMIT 1
