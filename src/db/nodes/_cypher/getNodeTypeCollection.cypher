MATCH (node:nodeLabel)
RETURN node
  ORDER BY toLower(toString(node.$sortByProperty)) $sortDirection
  SKIP $offset
  LIMIT $limit
