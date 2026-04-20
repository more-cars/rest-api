MATCH (a:$startNodeLabel {mc_id: $startNodeId})-[r:relationshipName]->(b:$endNodeLabel)
RETURN a, r, b
  LIMIT 1
