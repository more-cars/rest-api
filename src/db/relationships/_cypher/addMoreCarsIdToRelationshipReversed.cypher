MATCH (a:$startNodeLabel {mc_id: $startNodeId})<-[r:relationshipName]-(b:$endNodeLabel {mc_id: $endNodeId})
SET r.mc_id = $moreCarsId
RETURN a, r, b
  LIMIT 1
