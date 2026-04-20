MATCH (a:$startNodeLabel)<-[r:relationshipName]-(b:$endNodeLabel {mc_id:$endNodeId})
RETURN a, r, b
  LIMIT 1
