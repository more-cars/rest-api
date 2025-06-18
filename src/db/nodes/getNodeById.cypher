MATCH (node:nodeLabel {mc_id: $id})
RETURN node
LIMIT 1
