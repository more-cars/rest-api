MATCH (n:nodeLabel)
WHERE n.$filterByProperty $filterOperator $filterValue
RETURN count(n) AS nodeCount
