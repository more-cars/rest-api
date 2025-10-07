MATCH (node:nodeLabel)
WHERE node.$filterByProperty $filterOperator $filterValue
RETURN node
  ORDER BY node.$sortByProperty $sortDirection
  SKIP $offset
  LIMIT $limit
