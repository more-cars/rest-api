MATCH (a:$startNodeLabel)-[r:relationshipName]->(b {mc_id:$endNodeId})
RETURN a, r, b
  LIMIT 1
