MATCH (a)-[r:HAS_PRIME_IMAGE]->(b)
  WHERE a.mc_id IN [$nodeIds]
RETURN a, r, b
  LIMIT 100
