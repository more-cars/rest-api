MATCH (node:CarModel {mc_id: $id})
RETURN node
LIMIT 1
