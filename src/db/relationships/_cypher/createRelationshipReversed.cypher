MATCH (a {mc_id: $startNodeId}), (b {mc_id: $endNodeId})
CREATE (a)<-[r:relationshipName]-(b)
RETURN a, r, b
  LIMIT 1
