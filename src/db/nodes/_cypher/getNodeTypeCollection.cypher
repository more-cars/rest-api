MATCH (n:nodeLabel)
RETURN n
  ORDER BY n.$sortByProperty $sortDirection
  SKIP $offset
  LIMIT $limit
