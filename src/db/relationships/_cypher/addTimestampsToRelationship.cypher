MATCH ()-[relationship]-()
  WHERE elementId(relationship) = '$elementId'
SET
relationship.created_at = '$createdAt',
relationship.updated_at = '$updatedAt'
RETURN relationship
  LIMIT 1
