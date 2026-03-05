MATCH (node:nodeLabel)
WHERE node.$filterByProperty $filterOperator $filterValue
RETURN count(node) as nodeCount
