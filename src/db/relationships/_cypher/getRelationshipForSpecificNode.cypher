MATCH (a {mc_id: $nodeId})-[r:relationshipName]-(b)
RETURN r, b
  LIMIT 1
