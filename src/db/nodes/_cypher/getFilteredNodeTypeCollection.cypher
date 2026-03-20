MATCH (node:nodeLabel)
WHERE node.$filterByProperty $filterOperator $filterValue
RETURN node
  ORDER BY toLower(toString(node.$sortByProperty)) $sortDirection
  SKIP $offset
  LIMIT $limit
