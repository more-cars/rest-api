MATCH (a)-[r]-(b)
  WHERE elementId(r) = '$elementId'
SET
r.created_at = '$createdAt',
r.updated_at = '$updatedAt'
RETURN a, r, b
  LIMIT 1
