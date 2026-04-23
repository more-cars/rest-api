MATCH (n)
  WHERE elementId(n) = '$elementId'
SET n.mc_id = $moreCarsId
RETURN n
  LIMIT 1
