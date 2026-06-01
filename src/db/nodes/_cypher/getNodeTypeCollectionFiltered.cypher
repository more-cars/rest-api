MATCH (n:nodeLabel)
WHERE n.$filterByProperty $filterOperator $filterValue
RETURN n
  ORDER BY n.$sortByProperty $sortDirection
  SKIP $offset
  LIMIT $limit
