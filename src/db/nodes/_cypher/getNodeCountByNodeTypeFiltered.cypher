MATCH (node:nodeLabel)
WHERE node.$filterByProperty $filterOperator $filterValue
RETURN count(node) AS nodeCount
