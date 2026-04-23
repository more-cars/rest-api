MATCH (n:nodeLabel)
RETURN n
  ORDER BY toLower(toString(n.$sortByProperty)) $sortDirection
  SKIP $offset
  LIMIT $limit
