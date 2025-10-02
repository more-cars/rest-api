MATCH (node:nodeLabel)
RETURN node
  ORDER BY node.mc_id
  SKIP $offset
  LIMIT $limit
