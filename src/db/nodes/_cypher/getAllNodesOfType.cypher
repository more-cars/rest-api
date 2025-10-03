MATCH (node:nodeLabel)
RETURN node
  ORDER BY node.$sortByProperty $sortDirection
  SKIP $offset
  LIMIT $limit
