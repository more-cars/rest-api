MATCH (n:nodeLabel {mc_id: $id})
RETURN n
  LIMIT 1
