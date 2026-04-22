MATCH (a)-[r]-(b)
  WHERE elementId(r) = '$elementId'
SET r.mc_id = $moreCarsId
RETURN a, r, b
  LIMIT 1
