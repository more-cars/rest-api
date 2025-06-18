MATCH (node:nodeLabel)
WHERE elementId(node) = "$elementId"
SET node.mc_id = $moreCarsId
RETURN node
LIMIT 1
