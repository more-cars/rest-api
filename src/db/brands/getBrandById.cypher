MATCH (node:Brand {mc_id: $id})
RETURN node
LIMIT 1
