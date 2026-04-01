MATCH (a)-[:HAS_PRIME_IMAGE]->(b)
  WHERE a.mc_id IN [$nodeIds]
RETURN b
  LIMIT 100
