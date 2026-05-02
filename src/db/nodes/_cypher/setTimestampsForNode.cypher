MATCH (n)
  WHERE n.mc_id = $nodeId
SET n.created_at = '$createdAt'
SET n.updated_at = '$updatedAt'
RETURN n
  LIMIT 1
