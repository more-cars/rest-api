MATCH (a:$startNodeLabel {mc_id: $startNodeId}), (b:$endNodeLabel {mc_id: $endNodeId})
CREATE (a)-[r:relationshipName {created_at: '$timestamp', updated_at: '$timestamp'}]->(b)
RETURN a, r, b
  LIMIT 1
