MATCH ()-[rel]-()
  WHERE elementId(rel) = '$elementId'
SET rel.mc_id = $moreCarsId
RETURN rel
  LIMIT 1
