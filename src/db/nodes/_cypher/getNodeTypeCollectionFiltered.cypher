MATCH (n:nodeLabel)
WHERE n.$filterByProperty $filterOperator $filterValue
RETURN n
  ORDER BY toLower(toString(n.$sortByProperty)) $sortDirection
  SKIP $offset
  LIMIT $limit
