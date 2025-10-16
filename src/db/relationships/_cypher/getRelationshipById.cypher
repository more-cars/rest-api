MATCH (a)-[r {mc_id: $relationshipId}]->(b)
RETURN a, r, b
