MATCH (a {mc_id: $startNodeId})-[r:relationshipName]-(b {mc_id: $endNodeId})
RETURN r
