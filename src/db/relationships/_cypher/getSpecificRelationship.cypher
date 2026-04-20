MATCH (a:$startNodeLabel {mc_id: $startNodeId})-[r:relationshipName]->(b:$endNodeLabel {mc_id: $endNodeId})
RETURN a, r, b
