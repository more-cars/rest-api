MATCH (node)
  WHERE elementId(node) = '$elementId'
SET
node.created_at = '$createdAt',
node.updated_at = '$updatedAt'
RETURN node
  LIMIT 1
