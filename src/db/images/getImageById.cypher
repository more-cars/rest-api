MATCH (node:Image {mc_id: $id})
RETURN node
LIMIT 1
